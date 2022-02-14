const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/abiabstimmung/', controller.home);

router.get('/abiabstimmung/studentrview/:uuid', controller.studentview);

router.get('/abiabstimmung/studentmanagement/', controller.viewstudent);
router.post('/abiabstimmung/studentmanagement/', controller.finduser);
router.get('/abiabstimmung/studentmanagement/addstudent', controller.formstudent);
router.post('/abiabstimmung/studentmanagement/addstudent', controller.createstudent);
router.get('/abiabstimmung/studentmanagement/editstudent/:id', controller.editstudent);
router.post('/abiabstimmung/studentmanagement/editstudent/:id', controller.updatestudent);
router.get('/abiabstimmung/studentmanagement/viewstudent/:id', controller.viewallstudents);
router.get('/abiabstimmung/studentmanagement/:id',controller.deletestudent);

router.get('/abiabstimmung/vsmanagement/', controller.viewvs);
router.get('/abiabstimmung/vsmanagement/addvs', controller.formvs);
router.post('/abiabstimmung/vsmanagement/addvs', controller.createvs);
  
module.exports = router;