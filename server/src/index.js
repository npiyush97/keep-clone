const express = require("express");
const port = process.env.PORT || 8080;
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const app = new express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

// jwt authcheck
app.get("/jwt-check", (req, res) => {
  const { authorization } = req.headers;
  let token = authorization.split("Bearer ")[1];

  if (token === null) {
    res.status(498).json({ message: "Invalid Token" });
  } else {
    const initDb = async () => {
      await mongoose.connect(process.env.MONGOURI);
      let db = mongoose.model("userdata", schema);
      let userId = jwt.verify(token, process.env.SECRET_KEY);
      db.findOne({ id: userId.id }, (err, data) => {
        if (err) {
          res.sendStatus(401).json({ message: "Unauthorized" });
        }
        if (data) {
          res.sendStatus(200);
        }
      });
    };
    initDb();
  }
});
// get user data
app.get("/user-todos", (req, res) => {
  const { authorization } = req.headers;
  let token = authorization.split("Bearer ")[1];
  if (token === null) {
    res.status(498).json({ message: "Invalid Token" });
  } else {
    const initDb = async () => {
      await mongoose.connect(process.env.MONGOURI);
      let db = mongoose.model("userdata", schema);
      let userId = jwt.verify(token, process.env.SECRET_KEY);
      db.findOne({ id: userId.id }, (err, data) => {
        if (err) {
          res.status(401).json({ message: "Unauthorized" });
        }
        res.status(200).json(data);
      });
    };
    initDb();
  }
});

// login
app.get("/authCheck", async (req, res) => {
  let { email, password } = req.query;
  const initDb = async () => {
    await mongoose.connect(process.env.MONGOURI);
    let db = mongoose.model("userdata", schema);
    db.findOne({ email }, async (err, data) => {
      if (err) {
        res.status(500).json({ message: err });
      }
      console.log(data);
      let { id: userId, name, email, password: userPassword } = data;
      let validPassword = await bcrypt.compare(password, userPassword);
      let token = jwt.sign({ id: userId }, process.env.SECRET_KEY);
      if (!validPassword) {
        res.status(401).json({ message: "Invalid Password", payload: null });
      }
      res.status(200).send({
        name,
        email,
        accessToken: token,
      });
    });
  };
  initDb();
});

// // signup
app.post("/newuser", async (req, res) => {
  let { name, email, password } = req.body;
  console.log(password);
  let hashPassword = await bcrypt.hash(password, 10);
  let isCreated = false;
  const initDb = async () => {
    await mongoose.connect(process.env.MONGOURI);
    mongoose.connection.once("open", () => {
      console.log("connected!");
    });
    let userSchema = mongoose.model("userdata", schema);
    userSchema.find({ email }, (err, data) => {
      console.log(data, hashPassword);
      if (err) {
        res.status(500).json({ message: err });
      }
      if (data.length) {
        res.status(403).json({ message: "User Already exist" });
        throw Error("User already exist");
      }
      let newuser = new userSchema({
        id: uuidv4(),
        name,
        email,
        password: hashPassword,
      });
      console.log(newuser);
      newuser.save((err, user) => {
        if (err) {
          console.error(err);
        } else {
          console.log(user);
          isCreated = true;
        }
        if (isCreated) {
          res.status(200).json({ message: "succesfully created user" });
        } else {
          res.status(409).json({ message: "User isn't created" });
        }
      });
    });
  };
  initDb();
});
// post todos
app.post("/posttodo", (req, res) => {
  let { authorization } = req.headers;
  let token = authorization.split("Bearer ")[1];
  const initDb = async () => {
    await mongoose.connect(process.env.MONGOURI);
    mongoose.connection.once("open", () => {
      console.log("connected!");
    });
    let userToken = jwt.verify(token, process.env.SECRET_KEY);
    if (userToken.id) {
      let userSchema = mongoose.model("userdata", schema);
      let theone = await userSchema.findOne({ id: userToken.id });
      let prevTodos = theone.todos;
      let newTodos = [...prevTodos, req.body];
      // '6e372ba4-d59c-4b36-b4cb-985120600c38'
      // console.log([{ todos: [obj] }]);
      console.log(prevTodos)
      await theone.updateOne({ todos: [newTodos] });
      res
        .status(200)
        .json({ message: "Success", data: [newTodos]});
    } else {
      res.status(501).json({ message: userToken });
    }
  };
  initDb();
});
// edit todos
app.put("/update", (req, res) => {
  let { id, isChecked, email } = req.body;
  let { authorization } = req.headers;
  let token = authorization.split("Bearer ")[1];
  const initDb = async () => {
    await mongoose.connect(process.env.MONGOURI);
    mongoose.connection.once("open", () => {
      console.log("connected!");
    });
    let userToken = jwt.verify(token, process.env.SECRET_KEY);
    let userSchema = mongoose.model("userdata", schema);
    if (userToken.id) {
      let theone = await userSchema.findOne({ id: userToken.id });
      let prevTodos = theone.todos;
      let findUser = theone.todos.filter((x, idx) => idx === id);
      let idx = findUser[0].id;
      let newState = prevTodos.map((obj) =>
        obj.id === idx ? { ...obj, completed: isChecked } : obj
      );
      let newTodos = [...newState];
      await theone.updateOne({ todos: newTodos });
      res.status(200).json({ message: "update successful" });
    } else {
      res.status(500).json({ message: "Invalid Authorization" });
    }
  };
  initDb();
});
// delete todos
app.post("/delete-todo", (req, res) => {
  let { data: index } = req.body;
  let { authorization } = req.headers;
  let token = authorization.split("Bearer ")[1];
  const initDb = async () => {
    await mongoose.connect(process.env.MONGOURI);
    mongoose.connection.once("open", () => {
      console.log("connected!");
    });
    let userToken = jwt.verify(token, process.env.SECRET_KEY);
    let userSchema = mongoose.model("userdata", schema);
    if (userToken.id) {
      let theone = await userSchema.findOne({ id: userToken.id });
      let prevTodos = theone.todos;
      let filterUser = theone.todos.filter((x, idx) => x.id !== index);
      await theone.updateOne({ todos: filterUser });
      res.status(200).json({ message: "update successful", data: filterUser });
    } else {
      res.status(500).json({ message: "Invalid Authorization" });
    }
  };
  initDb();
});
// // dashboard route
// router.get("/dashboard");
app.listen(port, () => {
  console.log("started on server", port);
});
