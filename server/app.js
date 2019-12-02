const path = require('path')
const express = require('express')
const { Task } = require('./db/models/calendar.js')

const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));


app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/api/tasks', async (req, res, next) => {
  try {
    res.status(200).send(await Task.findAll())
  }
  catch (err) {
    next(err)
  }
})

app.get('/api/tasks/:id', async (req, res, next) => {
  try {
    res.status(200).send(await Task.findAll({
      where: {
         id: req.params.id
      }
   }))
  }
  catch (err) {
    next(err)
  }
})


app.post('/api/tasks', async (req, res, next) => {
  try {
      res.status(201)
      .send(await Task.create(req.body))
    }

  catch (err) {
    next(err)
  }
});

app.put('/api/tasks/:id', async (req, res, next) => {
  const attendance = req.body.isAttending
  const modifyId = req.params.id

  try {
    // const getIds = await Tasks.findAll({attributes: ['id']})
    // const arrIds = getIds.map(obj => obj.id.toString())

    // console.log(arrIds.includes(modifyId))
    // console.log('param',modifyId)
    // console.log('ids',arrIds.includes(modifyId))

    // if (!arrIds.includes(modifyId)) {
    //   res.status(400).send('Bad request. Please provide a valid id.')
    // }
    // else {
      // res.status(200)
      // .send(await Task.update(req.body))
    // }

    await Task.update(req.body, {
      where: {id: req.params.id},
      returning: true
    })
  }
  catch (err) {
    next(err)
  }
});

app.delete('/api/tasks/:id', async (req, res, next)  => {
  try {
    const deleteTask = await Task.destroy({
      where: {id: req.params.id}
    })
    if (deleteTask) {
      res.status(200).send()
    }
    else {
      res.status(400).send('error')
    }
  }
  catch (err) {
    next(err)
  }
})


module.exports = {app}
