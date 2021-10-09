const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({

	title: {
		type: String,
		required: true
	},
	
	description: {
		type: String,
		required: true
	},

	like: {
		type: bool,
		required: false
	}

}, {timestamps: true});

const listModel = new mongoose.model('list', listSchema);

module.exports = listModel;
