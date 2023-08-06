const express = require('express');
const tasksController = require('./controllers/tasksController');

const router = express.Router();

router.post('/insert', tasksController.insertData);
router.get('/tasks',  tasksController.getAll);
router.delete('/delete', tasksController.deleteData);
router.put('/update', tasksController.updateTask);


module.exports = router;
