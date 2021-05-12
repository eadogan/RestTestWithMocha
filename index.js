const express = require('express')
const app = express()
const schema = require('./utils/task')

const tasks = [
    {
        id: 1,
        name: 'Task 1',
        completed: false
    }, 
    {
        id: 2,
        name: 'Task 2',
        completed: false
    },
    {
        id: 3,
        name: 'Task 3',
        completed: false
    }
]

app.use(express.json())

app.get('/api/tasks', async (req, res) => {

    await res.status(200).send(tasks)
})

app.get('/api/tasks/:id', async (req, res) => {
    const taskId = req.params.id
    if(!taskId) {
        return res.status(404).send('The Task Id is not available!')
    }

    const task = await tasks.find((task) => task.id === parseInt(taskId))
    if(!task) {
        return res.status(404).send('The task is not available!')
    }
    res.send(task)
})

app.post('/api/tasks', async (req, res) => {
    const { error } = await schema.validateAsync(req.body)
    const task = {
        id: tasks.length +1,
        name: req.body.name,
        completed: req.body.completed
    }
    
    try {
        await tasks.push(task)
        res.status(201).send(task)
    } catch (error) {
        return res.status(400).send()
    }
})

app.patch('/api/tasks/:id', async (req, res) => {
    const { error } = await schema.validateAsync(req.body)
    try {
        const task = await tasks.find((task) => task.id === parseInt(req.params.id))
        if(!task) {
            return res.status(404).send('The task is not available!')
        }
        task.name = req.body.name
        task.completed = req.body.completed
        res.status(201).send(task)
    } catch (error) {
        return res.status(400).send()
    }
})

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await tasks.find((task) => task.id === parseInt(req.params.id))
        if(!task) {
            return res.status(404).send('The task is not available!')
        }
        const index = tasks.indexOf(task)
        tasks.splice(index)
        res.status(201).send(task)
    } catch (error) {
        return res.status(400).send()
    }
})


const port = process.env.PORT || 3000
module.exports = app.listen(port, () => {
    console.log(`Server is on port ${port}`)
})
