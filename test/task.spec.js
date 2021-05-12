let chai = require('chai')
let chaiHttp = require('chai-http')
const should = chai.should()
let server = require('../index')

// // Assertion style chai.should
// chai.should()

chai.use(chaiHttp)

describe('Tasks API', () => {
    /**
     * Test the GET route
     */
    describe('GET /api/tasks', () => {
        it('should return all the tasks when call existing route', (done) => {
            chai.request(server)
                .get('/api/tasks')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.equal(3)
                done()
                })   
        }),

        it('should not return all the tasks when call wrong route', (done) => {
            chai.request(server)
                .get('/api/task')
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })  
        })
    })

    /**
     * Test the GET By Id route
     */
     describe('GET /api/tasks/:id', () => {
        it('should return task when call the task by id', (done) => {
            const taskId = 2;
            chai.request(server)
                .get('/api/tasks/'+taskId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('completed')
                done()
                })   
        }),
        
        it('should not return task when call the not existing data id', (done) => {
            const taskId = 123
            chai.request(server)
                .get('/api/tasks/'+taskId)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.text.should.be.equal('The task is not available!')
                done()
                })
        })

    })


    /**
     * Test the POST route
     */
    describe('POST /api/tasks', () => {
        it('should return success when post valid task data', (done) => {
            const task = {
                name: 'Task 4',
                completed: false
            }
            chai.request(server)
                .post('/api/tasks')
                .send(task)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('completed')
                    res.body.should.have.property('id').equal(4)
                done()
                })
        })
    })


    /**
     * Test the PATCH route
     */


    /**
     * Test the DELETE route
     */
})
