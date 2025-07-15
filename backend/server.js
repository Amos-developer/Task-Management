const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const session = require("express-session");

const app = express();
const port = 8081;
const secretKey = crypto.randomBytes(32).toString("hex");

app.use(bodyParser.json());
app.use(
  cors({
  origin: "http://localhost:8080",
  credentials: true,
  })
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/shopDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const User = require("./models/register.js");
const Taskdetails = require("./models/task.js");

// Route for register user
app.post("/", (req, res) => {
  const { fullname, phone, username, password } = req.body;
  const newUser = new User({ fullname, phone, username, password });
  newUser
    .save()
    .then(() => res.status(200).send({ message: "User saved successfully" }))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Failed to register user: " + err.message })
    );
});

// Route for adding task
app.post("/Task", (req, res) => {
  const { taskName, taskStatus, taskDescription, startDate, endDate } = req.body;
  const username = req.session.user;
  if (!username) {
    return res.status(401).send({ message: "Not Authenticated" });
  }
  const task = new Taskdetails({
    taskName,
    taskStatus,
    taskDescription,
    startDate,
    endDate,
    username,
  });

  task
    .save()
    .then(() =>
      res.status(200).send({ message: "Details saved successfully..." })
    )
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Failed to save details: " + err.message })
    );
  
});

// Route for get tasks
app.get("/Taskdetails/:username", (req, res) => {
  const username = req.session.user;
  if (!username) {
    return res.status(401).send({ message: "Not Authenticated" });
  }else{
  Taskdetails.find({username})
    .then((details) =>{
       res.status(200).send(details);
  }).catch((error) =>
      res.status(500).send({ message: "Failed to fetch details: " + error.message })
    );
  }
});

// Route for Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        req.session.user = user.username;
        res.status(200).send({ message: "User Login successfully..." });
      } else {
        res.status(401).send({ message: "Wrong username or password..." });
      }
    })
    .catch((err) =>
      res.status(500).send({ message: "Error during login: " + err.message })
    );
});

// Route for getting a task by ID
app.get("/Taskdetails/task/:taskId", (req, res) => {
  const { taskId } = req.params;
  const username = req.session.user;
  if (!username) {
    return res.status(401).send({ message: "Not Authenticated" });
  }
  Taskdetails.findOne({ _id: taskId, username })
    .then(task => {
      if (!task) {
        return res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send(task);
    })
    .catch(err => res.status(500).send({ message: "Failed to fetch task: " + err.message }));
});


// Route for updating a task
app.put("/Taskdetails/:username/:taskId", (req, res) => {
  const { taskName, taskStatus, taskDescription, startDate, endDate } = req.body;
  const { username, taskId } = req.params;
  if (!username) {
    return res.status(401).send({ message: "Not Authenticated" });
  }
  Taskdetails.findOneAndUpdate(
    { _id: taskId, username },
    { taskName, taskStatus, taskDescription, startDate, endDate },
    { new: true } // Return the updated document
  )
    .then(updatedTask => {
      if (!updatedTask) {
        return res.status(404).send({ message: "Task not found or user unauthorized" });
      }
      res.status(200).send(updatedTask);
    })
    .catch(error => res.status(500).send({ message: "Failed to update task: " + error.message }));
});

// Route for deleting a task
app.delete("/Taskdetails/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const username = req.session.user;
  if (!username) {
    return res.status(401).send({ message: "Not Authenticated" });
  }
  Taskdetails.deleteOne({ _id: taskId, username })
    .then(() => {
      res.status(200).send({ message: "Task deleted successfully" });
    })
    .catch((error) => {
      console.log(error);
    });
  });

// Route for session
app.get("/session", (req, res) => {
  if (req.session.user) {
    res.status(200).send({ user: req.session.user });
  } else {
    res.status(401).send({ message: "Not Authenticated" });
  }
});

// Route for logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Error during logout: " + err.message });
    } else {
      res.status(200).send({ message: "Logged out" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
