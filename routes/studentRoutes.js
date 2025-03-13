const express = require('express');
const {getStudents, createStudents,showStudents, updateStudent, deleteStudent} = require('../controllers/studentController');

const router = express.Router();

router.get('/',getStudents);
router.get('/:id', showStudents);
router.post('/', createStudents);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;


