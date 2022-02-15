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
router.get('/abiabstimmung/vsmanagement/editvs/:id', controller.editvs);
router.post('/abiabstimmung/vsmanagement/editvs/:id', controller.updatevs);
router.get('/abiabstimmung/vsmanagement/viewvs/:id', controller.viewallvs);
router.get('/abiabstimmung/vsmanagement/:id',controller.deletevs);

router.get('/abiabstimmung/categorymanagement/', controller.viewcategory);
router.get('/abiabstimmung/categorymanagement/addcategory', controller.formcategory);
router.post('/abiabstimmung/categorymanagement/addcategory', controller.createcategory);
router.get('/abiabstimmung/categorymanagement/editcategory/:id', controller.editcategory);
router.post('/abiabstimmung/categorymanagement/editcategory/:id', controller.updatecategory);
router.get('/abiabstimmung/categorymanagement/viewcategory/:id', controller.viewallcategory);
router.get('/abiabstimmung/categorymanagement/:id',controller.deletecategory);

router.get('/abiabstimmung/standardmanagement/', controller.viewstandard);
router.get('/abiabstimmung/standardmanagement/addstandard', controller.formstandard);
router.post('/abiabstimmung/standardmanagement/addstandard', controller.createstandard);
router.get('/abiabstimmung/standardmanagement/editstandard/:id', controller.editstandard);
router.post('/abiabstimmung/standardmanagement/editstandard/:id', controller.updatestandard);
router.get('/abiabstimmung/standardmanagement/viewstandard/:id', controller.viewallstandard);
router.get('/abiabstimmung/standardmanagement/:id',controller.deletestandard);

router.get('/abiabstimmung/teachercategorymanagement/', controller.viewteachercategory);
router.get('/abiabstimmung/teachercategorymanagement/addteachercategory', controller.formteachercategory);
router.post('/abiabstimmung/teachercategorymanagement/addteachercategory', controller.createteachercategory);
router.get('/abiabstimmung/teachercategorymanagement/editteachercategory/:id', controller.editteachercategory);
router.post('/abiabstimmung/teachercategorymanagement/editteachercategory/:id', controller.updateteachercategory);
router.get('/abiabstimmung/teachercategorymanagement/viewteachercategory/:id', controller.viewallteachercategory);
router.get('/abiabstimmung/teachercategorymanagement/:id',controller.deleteteachercategory);
  
module.exports = router;