const {app} = require('./app.js')
const { db } = require('./db/db.js')
const { Task } = require('./db/models/calendar.js')

const PORT = 3000


async function syncAndSeed() {
  try {
    await db.sync({ force: true });
      const testTask1 = Task.create({
        taskName: 'Test',
        taskDateDue: '2019-12-03',
        taskTimeDue: '13:00'
      })
      const testTask2 = Task.create({
        taskName: 'Test2',
        taskDateDue: '2019-12-03',
        taskTimeDue: '18:00'
      })
      const testTask3 = Task.create({
        taskName: 'Test3',
        taskDateDue: '2019-12-02',
        taskTimeDue: '18:00'
      })
  } catch (e) {
    console.log(e)
  }
  console.log('done seeding');
}

// db.sync()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`now listening on ${PORT}`)
//     })
//   })
//   .catch(e => {
//     console.log('connection error', e);
// });

syncAndSeed().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
  .catch(e => {
    console.log('connection error', e);
  })
})
