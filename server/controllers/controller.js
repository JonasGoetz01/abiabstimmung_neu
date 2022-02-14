const mysql = require('mysql');
const async = require('async');
const fs = require('fs-extra');
const hbs = require('handlebars');
const path = require('path');
const moment = require('moment');
const { compileFunction } = require('vm');
const asyncHandler = require('express-async-handler')
const open = require('open');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


exports.home = (req, res) => {
  connection.query('SELECT * FROM student', (err, student) => {
    if (!err) {
      console.log(student)
      res.render('home', { student })
    }else{
      console.log(err);
    }
  });
}

/* ----------------------------------------------------student-section---------------------------------------------------------------------- */


exports.viewstudent = (req, res) => {
  connection.query('SELECT * FROM student', (err, rows) => {
    if (!err) {
      let removedStudent = req.query.removed;
      res.render('studentmanagement', { rows, removedStudent });
    } else {
      console.log(err);
    }
  });
}


exports.finduser = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM student WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('studentmanagement', { rows });
    } else {
      console.log(err);
    }
  });
}


exports.formstudent = (req, res) => {
  res.render('add-student');
}


exports.createstudent = (req, res) => {
  const { name, forename } = req.body;
  connection.query('INSERT INTO student SET name = ?, forename = ?', [name, forename], (err, rows) => {
    if (!err) {
      res.render('add-student', { alert: 'Schüler erfolgreich angelegt.' });
    } else {
      console.log(err);
    }
  });
}

exports.studentview = (req,res) => {
  connection.query('SELECT * FROM assignments', (err, rows) => {
    if(!err){
      const student_uuid = req.params.uuid
      for(var i = 0; i < rows.length; i++){
        if(rows[i].uuid == student_uuid){
          if(i + 1 < rows.length){
            var student = rows[i + 1]
          }else{
            var student = rows[0]
          }
          res.render('studentview', { student });
        }
      }
    }else{
      console.log(err)
    }
  })
}


exports.editstudent = (req, res) => {
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-student', { rows });
    } else {
      console.log(err);
    }
  });
}


exports.updatestudent = (req, res) => {
  const { name, forename } = req.body;
  const voted = req.body.voted ? 1 : 0;
  connection.query('UPDATE student SET Name = ?, Forename = ?, voted = ? WHERE id = ?', [name, forename, voted, req.params.id], (err, rows) => {
    if (!err) {
      connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('edit-student', { rows, alert: `${name} ${forename} wurde aktualisiert.` });
        } else {
          console.log(err);
        }
      });
    } else {
      console.log(err);
    }
  });
}


exports.deletestudent = (req, res) => {
  connection.query('DELETE from student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      let removedstudent = encodeURIComponent('student successeflly removed.');
      res.redirect('/abiabstimmung/studentmanagement');
    } else {
      console.log(err);
    }
  });
}


exports.viewallstudents = (req, res) => {
  connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-student', { rows });
    } else {
      console.log(err);
    }
  });
}

//---------------------------------------------Versus-------------------------------------------------------------


exports.viewvs = (req, res) => {
  connection.query('SELECT * FROM vs', (err, rows) => {
    if (!err) {
      let removedStudent = req.query.removed;
      res.render('vsmanagement', { rows, removedStudent });
    } else {
      console.log(err);
    }
  });
}


exports.formvs = (req, res) => {
  res.render('add-vs');
}


exports.createvs = (req, res) => {
  const { name, option1, option2 } = req.body;
  connection.query('INSERT INTO vs SET Name = ?, Option1 = ?, Option2 = ?', [name, option1, option2], (err, rows) => {
    if (!err) {
      res.render('add-student', { alert: 'Versus Frage erfolgreich angelegt.' });
    } else {
      console.log(err);
    }
  });
}