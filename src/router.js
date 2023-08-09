const express = require('express');
const tasksController = require('./controllers/tasksController');
const authController = require('./controllers/authController');

const router = express.Router();

router.get('/tasks/:jwt',  tasksController.getAll);
router.post('/insert', tasksController.insertData);
router.delete('/delete', tasksController.deleteData);
router.put('/update', tasksController.updateTask);
router.post('/auth/register', authController.registerUser);
router.post('/auth/login',authController.loginUser)

module.exports = router;
