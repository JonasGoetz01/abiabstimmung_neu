const mysql = require('mysql');
const fs = require('fs');

// Connection Pool
let connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});


exports.home = (req, res) => {
	connection.query('SELECT * FROM category', (err, category) => {
		if (!err) {
			connection.query('SELECT * FROM `default-student`', (err, standard) => {
				if (!err) {
					connection.query('SELECT * FROM vs', (err, vs) => {
						if (!err) {
							connection.query('SELECT * FROM `category-teacher`', (err, teachercategory) => {
								if (!err) {
									connection.query('SELECT * FROM student', (err, students) => {
										if (!err) {
											connection.query('SELECT * FROM teacher', (err, teacher) => {
												if (!err) {
													res.render('home', {
														category,
														standard,
														vs,
														teachercategory,
														students,
														teacher
													})
												} else {
													console.log(err);
												}
											});
										} else {
											console.log(err);
										}
									});
								} else {
									console.log(err);
								}
							});
						} else {
							console.log(err);
						}
					});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}

/* ----------------------------------------------------student-section---------------------------------------------------------------------- */


exports.viewstudent = (req, res) => {
	connection.query('SELECT * FROM student', (err, rows) => {
		if (!err) {
			let removedStudent = req.query.removed;
			res.render('studentmanagement', {rows, removedStudent});
		} else {
			console.log(err);
		}
	});
}


exports.finduser = (req, res) => {
	let searchTerm = req.body.search;
	connection.query('SELECT * FROM student WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
		if (!err) {
			res.render('studentmanagement', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.formstudent = (req, res) => {
	res.render('add-student');
}


exports.createstudent = (req, res) => {
	const {name, forename} = req.body;
	connection.query('INSERT INTO student SET name = ?, forename = ?', [name, forename], (err, rows) => {
		if (!err) {
			res.render('add-student', {alert: 'Schüler erfolgreich angelegt.'});
		} else {
			console.log(err);
		}
	});
}


exports.editstudent = (req, res) => {
	connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('edit-student', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.updatestudent = (req, res) => {
	const {name, forename} = req.body;
	const voted = req.body.voted ? 1 : 0;
	connection.query('UPDATE student SET Name = ?, Forename = ?, voted = ? WHERE id = ?', [name, forename, voted, req.params.id], (err, rows) => {
		if (!err) {
			connection.query('SELECT * FROM student WHERE id = ?', [req.params.id], (err, rows) => {
				if (!err) {
					res.render('edit-student', {rows, alert: `${name} ${forename} wurde aktualisiert.`});
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
			res.render('view-student', {rows});
		} else {
			console.log(err);
		}
	});
}


/* ----------------------------------------------------teacher-section---------------------------------------------------------------------- */


exports.viewteacher = (req, res) => {
	connection.query('SELECT * FROM teacher', (err, rows) => {
		if (!err) {
			let removedStudent = req.query.removed;
			res.render('teachermanagement', {rows, removedStudent});
		} else {
			console.log(err);
		}
	});
}


exports.formteacher = (req, res) => {
	res.render('add-teacher');
}


exports.createteacher = (req, res) => {
	const {name, forename} = req.body;
	connection.query('INSERT INTO teacher SET name = ?, forename = ?', [name, forename], (err, rows) => {
		if (!err) {
			res.render('add-teacher', {alert: 'Lehrer erfolgreich angelegt.'});
		} else {
			console.log(err);
		}
	});
}


exports.editteacher = (req, res) => {
	connection.query('SELECT * FROM teacher WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('edit-teacher', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.updateteacher = (req, res) => {
	const {name, forename} = req.body;
	const voted = req.body.voted ? 1 : 0;
	connection.query('UPDATE teacher SET Name = ?, Forename = ? WHERE id = ?', [name, forename, req.params.id], (err, rows) => {
		if (!err) {
			connection.query('SELECT * FROM teacher WHERE id = ?', [req.params.id], (err, rows) => {
				if (!err) {
					res.render('edit-teacher', {rows, alert: `${name} ${forename} wurde aktualisiert.`});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}


exports.deleteteacher = (req, res) => {
	connection.query('DELETE from teacher WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			let removedstudent = encodeURIComponent('Lehrer erfolgreich gelöscht.');
			res.redirect('/abiabstimmung/teachermanagement');
		} else {
			console.log(err);
		}
	});
}


exports.viewallteacher = (req, res) => {
	connection.query('SELECT * FROM teacher WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('view-teacher', {rows});
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
			res.render('vsmanagement', {rows, removedStudent});
		} else {
			console.log(err);
		}
	});
}


exports.formvs = (req, res) => {
	res.render('add-vs');
}


exports.createvs = (req, res) => {
	const {option1, option2} = req.body;
	connection.query('INSERT INTO vs SET Option1 = ?, Option2 = ?', [option1, option2], (err, rows) => {
		if (!err) {
			res.render('add-vs', {alert: 'Versus Frage erfolgreich angelegt.'});
		} else {
			console.log(err);
		}
	});
}

exports.editvs = (req, res) => {
	connection.query('SELECT * FROM vs WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('edit-vs', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.updatevs = (req, res) => {
	const {option1, option2} = req.body;
	const voted = req.body.voted ? 1 : 0;
	connection.query('UPDATE vs SET Option1 = ?, Option2 = ? WHERE ID = ?', [option1, option2, req.params.id], (err, rows) => {
		if (!err) {
			connection.query('SELECT * FROM vs WHERE ID = ?', [req.params.id], (err, rows) => {
				if (!err) {
					res.render('edit-vs', {rows, alert: `Frage wurde aktualisiert.`});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}


exports.deletevs = (req, res) => {
	connection.query('DELETE from vs WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			let removedstudent = encodeURIComponent('Frage erfolgreich gelöscht.');
			res.redirect('/abiabstimmung/vsmanagement');
		} else {
			console.log(err);
		}
	});
}


exports.viewallvs = (req, res) => {
	connection.query('SELECT * FROM vs WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('view-vs', {rows});
		} else {
			console.log(err);
		}
	});
}


//---------------------------------------------Category-------------------------------------------------------------


exports.viewcategory = (req, res) => {
	connection.query('SELECT * FROM category', (err, rows) => {
		if (!err) {
			let removedStudent = req.query.removed;
			res.render('categorymanagement', {rows, removedStudent});
		} else {
			console.log(err);
		}
	});
}


exports.formcategory = (req, res) => {
	res.render('add-category');
}


exports.createcategory = (req, res) => {
	const {name} = req.body;
	connection.query('INSERT INTO category SET name = ?', [name], (err, rows) => {
		if (!err) {
			res.render('add-category', {alert: 'Kategorie erfolgreich angelegt.'});
		} else {
			console.log(err);
		}
	});
}

exports.editcategory = (req, res) => {
	connection.query('SELECT * FROM category WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('edit-category', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.updatecategory = (req, res) => {
	const {name} = req.body;
	const voted = req.body.voted ? 1 : 0;
	connection.query('UPDATE category SET name = ? WHERE ID = ?', [name, req.params.id], (err, rows) => {
		if (!err) {
			connection.query('SELECT * FROM category WHERE ID = ?', [req.params.id], (err, rows) => {
				if (!err) {
					res.render('edit-category', {rows, alert: `Kategorie wurde aktualisiert.`});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}


exports.deletecategory = (req, res) => {
	connection.query('DELETE from category WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			let removedstudent = encodeURIComponent('Kategorie erfolgreich gelöscht.');
			res.redirect('/abiabstimmung/categorymanagement');
		} else {
			console.log(err);
		}
	});
}


exports.viewallcategory = (req, res) => {
	connection.query('SELECT * FROM category WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('view-category', {rows});
		} else {
			console.log(err);
		}
	});
}


//---------------------------------------------Standard-------------------------------------------------------------


exports.viewstandard = (req, res) => {
	connection.query('SELECT * FROM `default-student`', (err, rows) => {
		if (!err) {
			let removedStudent = req.query.removed;
			res.render('standardmanagement', {rows, removedStudent});
		} else {
			console.log(err);
		}
	});
}


exports.formstandard = (req, res) => {
	res.render('add-standard');
}


exports.createstandard = (req, res) => {
	const {name} = req.body;
	connection.query('INSERT INTO `default-student` SET name = ?', [name], (err, rows) => {
		if (!err) {
			res.render('add-standard', {alert: 'Standard Kategorie erfolgreich angelegt.'});
		} else {
			console.log(err);
		}
	});
}

exports.editstandard = (req, res) => {
	connection.query('SELECT * FROM `default-student` WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('edit-standard', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.updatestandard = (req, res) => {
	const {name} = req.body;
	const voted = req.body.voted ? 1 : 0;
	connection.query('UPDATE `default-student` SET name = ? WHERE ID = ?', [name, req.params.id], (err, rows) => {
		if (!err) {
			connection.query('SELECT * FROM `default-student` WHERE ID = ?', [req.params.id], (err, rows) => {
				if (!err) {
					res.render('edit-standard', {rows, alert: `Standard Kategorie wurde aktualisiert.`});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}


exports.deletestandard = (req, res) => {
	connection.query('DELETE from `default-student` WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			let removedstudent = encodeURIComponent('Standard Kategorie erfolgreich gelöscht.');
			res.redirect('/abiabstimmung/standardmanagement');
		} else {
			console.log(err);
		}
	});
}


exports.viewallstandard = (req, res) => {
	connection.query('SELECT * FROM `default-student` WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('view-standard', {rows});
		} else {
			console.log(err);
		}
	});
}


//---------------------------------------------Teachercategory-------------------------------------------------------------


exports.viewteachercategory = (req, res) => {
	connection.query('SELECT * FROM `category-teacher`', (err, rows) => {
		if (!err) {
			let removedStudent = req.query.removed;
			res.render('teachercategorymanagement', {rows, removedStudent});
		} else {
			console.log(err);
		}
	});
}


exports.formteachercategory = (req, res) => {
	res.render('add-teachercategory');
}


exports.createteachercategory = (req, res) => {
	const {name} = req.body;
	connection.query('INSERT INTO `category-teacher` SET name = ?', [name], (err, rows) => {
		if (!err) {
			res.render('add-teachercategory', {alert: 'Lehrer Kategorie erfolgreich angelegt.'});
		} else {
			console.log(err);
		}
	});
}

exports.editteachercategory = (req, res) => {
	connection.query('SELECT * FROM `category-teacher` WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('edit-teachercategory', {rows});
		} else {
			console.log(err);
		}
	});
}


exports.updateteachercategory = (req, res) => {
	const {name} = req.body;
	const voted = req.body.voted ? 1 : 0;
	connection.query('UPDATE `category-teacher` SET name = ? WHERE ID = ?', [name, req.params.id], (err, rows) => {
		if (!err) {
			connection.query('SELECT * FROM `category-teacher` WHERE ID = ?', [req.params.id], (err, rows) => {
				if (!err) {
					res.render('edit-teachercategory', {rows, alert: `Lehrer Kategorie wurde aktualisiert.`});
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
}


exports.deleteteachercategory = (req, res) => {
	connection.query('DELETE from `category-teacher` WHERE ID = ?', [req.params.id], (err, rows) => {
		if (!err) {
			let removedstudent = encodeURIComponent('Lehrer Kategorie erfolgreich gelöscht.');
			res.redirect('/abiabstimmung/teachercategorymanagement');
		} else {
			console.log(err);
		}
	});
}


exports.viewallteachercategory = (req, res) => {
	connection.query('SELECT * FROM `category-teacher` WHERE id = ?', [req.params.id], (err, rows) => {
		if (!err) {
			res.render('view-teachercategory', {rows});
		} else {
			console.log(err);
		}
	});
}

/**
 *
 * SQL statements :
 *      get Name and number of votes: SELECT count(*) anzahl, Name, Forename FROM `student-category` INNER JOIN student ON `student-category`.`studentID` = `student`.`ID` WHERE optionID = 4 GROUP BY student.ID ORDER BY count(*) desc;
 *      get versus results with number: SELECT count(*) anzahl, `student-vs`.`option` FROM `student-vs` GROUP BY `student-vs`.`option` ORDER BY count(*) DESC;
 *      get standard results: SELECT name, AVG(value) result FROM `student-default` JOIN `default-student` ON `student-default`.`optionID` = `default-student`.`ID` GROUP BY optionID;
 *      get teacher results with numbers:
 *
 * @param {*} req
 * @param {*} res
 */
function getCategoryResults(id, name, callback) {
	connection.query('SELECT count(*) anzahl, Name, Forename FROM `student-category` INNER JOIN student ON `student-category`.`studentID` = `student`.`ID` WHERE optionID = ? GROUP BY student.ID ORDER BY count(*) desc;', id, (err, category_results) => {
		if (!err) {
			return callback(category_results)
		} else {
			console.log(err);
		}
	})
}

function getTeacherCategoryResults(id, name, callback) {
	connection.query('SELECT count(*) anzahl, Name, Forename FROM `teacher-category` INNER JOIN teacher ON `teacher-category`.`teacherID` = `teacher`.`ID` WHERE optionID = ? GROUP BY teacher.ID ORDER BY count(*) desc;', id, (err, teachercategory_results) => {
		if (!err) {
			teachercategory_results.name = name
			return callback(teachercategory_results)
		} else {
			console.log(err);
		}
	})
}


exports.teacherevaluation = (req, res) => {
	connection.query('SELECT * FROM `category-teacher`', (err, teacher_categories) => {
		if (!err) {
			for (let i = 0; i < teacher_categories.length; i++) {
				console.log(teacher_categories[i].name)
				getTeacherCategoryResults(teacher_categories[i].ID, teacher_categories[i].name, function (teacher_categories_results) {

				})
				//res.render('teacherevaluation', {endData});
			}
		} else {
			console.log(err);
		}
	});
}

