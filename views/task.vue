<template>
<div>
	<h3>Single task</h3>
	<div>
		<div>{{ task.name }}</div>
		<div>{{ task.status.name }}</div>
		<div>{{ task.createdAt }}</div>
		<div>{{ task.updatedAt }}</div>
	</div>
</div>
</template>

<script>
var axios = require('axios');
export default {
    props: {
		taskId: {
			type: Number,
			default: 0
		},
	},
    data: function () {
        return {
            task: {
            	id: 0,
            	status: {
            		id: 0,
            		name: 'dummy'
            	},
            },
        }
    },
	created: function () {
		this.refreshTask();
	},
	watch : {
		taskId : function(){
			this.refreshTask();
		}
	},
	methods: {
		refreshTask: function() {
			var self = this;
			axios.get('/api/get_task/'+self.taskId)
			  .then(function (response) {
				  self.task = response.data;
			  })
			  .catch(function (error) {
				  console.log(error);
			  });
		},
	},
}
</script>