const mongoose = require("mongoose");

// Create the schema
const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true, 
  },
  taskStatus: {
    type: String,
    required: true, 
  },
  taskDescription: {
    type: String,
    required: true, 
  },
  startDate: {
    type: Date,
    required: true, 
  },
  endDate: {
    type: Date,
    required: true, 
  },
  username: {
    type: String,
    required: true,
  },
});

// Create the model
const Taskdetails = mongoose.model("TaskDetails", taskSchema);

module.exports = Taskdetails;
