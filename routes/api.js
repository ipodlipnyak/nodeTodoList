var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');

var sequelize = new Sequelize({
	  database: 'nodetest',
	  username: 'ncadmin',
	  password: '5k3E18nf',
	  dialect: 'mysql'
	});

var status = sequelize.define('status', {
	name: Sequelize.STRING
});

var task = sequelize.define('task', {
	name: Sequelize.STRING,
});

status.hasMany(task);
task.belongsTo(status);

router.get('/get_status', function(req, res, next) {
	status.findAll().then(rows => {
		res.json(rows);
		})
});

router.get('/get_task', function(req, res, next) {
	task.findAll({include: [status]}).then(rows => {
		res.json(rows);
		})
});

router.get('/get_task/:taskId', function(req, res, next) {
	task.findOne({where: {id: req.params.taskId}, include: [status]}).then(rows => {
		res.json(rows);
		})
});

router.post('/new_task', function (req, res) {
	task.create({
		name: req.body.taskName,
		statusId: req.body.statusId
	});
	res.json({status:'success'});
});

router.put('/update_task', function (req, res) {
	task.update({
		name: req.body.taskName,
		statusId: req.body.statusId
	},
	{
		where: {id: req.body.taskId}
	});
	res.json({status:'success'});
});

router.delete('/delete_task/:taskId', function (req, res) {
	task.destroy({where: {id: req.params.taskId}});
	res.json({status:'success'});
});

module.exports = router;
