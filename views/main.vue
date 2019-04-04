<template>
    <div>
    	<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        <h1>Task list</h1>
        <ul>
        	<li v-for="task in taskList">
        		<div v-if="selectedTask.id != task.id">{{ task.name }}</div>
        		<div v-if="selectedTask.id != task.id">{{ task.status.name }}</div>
        		<input v-if="selectedTask.id == task.id" v-model="selectedTask.name"/>
        		
        		<select v-if="selectedTask.id == task.id" v-model="selectedTask.status.id">
        		  <option v-for="status in statusList" value="status.id">{{ status.name }}</option>
        		</select>
				
        		<button v-if="selectedTask.id != task.id" @click.prevent="selectedTask = task">Update</button>
        		<button v-if="selectedTask.id == task.id" @click.prevent="saveTask()">Save</button>
        		<button v-if="selectedTask.id == task.id" @click.prevent="selectedTask = []">Undo</button>
        		<button @click.prevent="deleteTask(task.id)">Delete</button>
        	</li>
        </ul>
        <div>
        <h3>New task</h3>
        <input v-model="newTask.name"/>
        <button @click.prevent="saveNewTask()">Create task</button>
        </div>
    </div>
</template>

<script>
var axios = require('axios');
export default {
    data: function () {
        return {
            taskList: [],
            statusList: [],
            selectedTask: [],
            newTask:{
            	name: '',
            	statusId: 1
            }
        }
    },
	beforeCreate : function() {
		var self = this;
		axios.get('/api/get_task')
		  .then(function (response) {
			  self.taskList = response.data;
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
		
		axios.get('/api/get_status')
		  .then(function (response) {
			  self.statusList = response.data;
		  })
		  .catch(function (error) {
			  console.log(error);
		  });
	},
	methods: {
		refreshList: function() {
			var self = this;
			axios.get('/api/get_task')
			  .then(function (response) {
				  self.taskList = response.data;
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
		},
		deleteTask: function(id) {
			var self = this;
			axios.delete('/api/delete_task/'+id)
			  .then(function (response) {
				  self.refreshList();
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
		},
		saveTask: function() {
			var self = this;
			axios.put('/api/update_task',{
				taskId: self.selectedTask.id,
				taskName: self.selectedTask.name,
				statusId: Number(self.selectedTask.status.id)
			})
			  .then(function (response) {
				  self.refreshList();
				  self.selectedTask = [];
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
		},
		saveNewTask: function() {
			var self = this;
			axios.post('/api/new_task',{
				taskName: self.newTask.name,
				statusId: self.newTask.statusId
			})
			  .then(function (response) {
				  self.refreshList();
				  self.newTask.name = '';
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
		},
		
	},
}
</script>