const express = require('express');
const tasksController = require('./controllers/tasksController');
const authController = require('./controllers/authController');

const router = express.Router();

router.get('/tasks/:jwt',  tasksController.getAll);
router.get('/deletedTasks/:jwt', tasksController.getNotActive)
router.post('/insert', tasksController.insertData);
router.delete('/delete', tasksController.deleteData);
router.put('/update', tasksController.updateTask);
router.put('/activeTask', tasksController.setActive);

router.post('/auth/register', authController.registerUser);
router.post('/auth/login',authController.loginUser)

module.exports = router;
