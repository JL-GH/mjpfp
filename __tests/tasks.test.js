
const request = require('supertest')
const { app } = require('../server/app.js')
const { db } = require('../server/db/db.js')
const { Task } = require('../server/db/models/calendar')

beforeEach(done => {
  db.sync({ force: true });
  done();
});
afterAll(done => {
  db.close();
  done();
});
describe('/api/tasks routes', () => {
  const testTask = { taskName: 'TEST', taskComplete: false, taskDateDue: '2019-12-02', taskTimeDue: '13:00'};
  const testTask1 = { taskName: 'TEST', taskComplete: false, taskDateDue: '2019-12-03', taskTimeDue: '19:00'};

  describe('GET to /api/tasks', () => {
    it('should GET all tasks', () => {
      return Promise.all([Task.create(testTask), Task.create(testTask1)]).then(
        () => {
          return request(app)
            .get('/api/tasks')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              const task = response.body;
              expect(task.length).toBe(1);
              expect(task).toEqual(
                expect.arrayContaining([
                  expect.objectContaining(testTask),
                  expect.objectContaining(testTask1),
                ])
              );
            })
            .catch(err => {
              fail(err);
            });
        }
      );
    });
  });
});
