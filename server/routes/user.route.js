const { handleUser, handleCreateUser, handleUpdateUser, handleUserDelete } = require('../controllers/user.controller')

const userRouter = require('express').Router()

//read data
/* 
    GET
    API: http://localhost:5000/
*/
userRouter.get('/', handleUser)

//create data
/* 
    POST
    API: http://localhost:5000/create
    BODY: {
        name, email, phone
    }
*/
userRouter.post('/create', handleCreateUser)

//update data
/* 
    PUT
    API: http://localhost:5000/update/:id
    BODY: {
        name, email, phone
    }
*/
userRouter.put('/update/:id', handleUpdateUser)

//delete data
/* 
    DELETE
    API: http://localhost:5000/delete/:id
*/
userRouter.delete('/delete/:id', handleUserDelete)

module.exports = userRouter