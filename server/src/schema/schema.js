const { Schema } = require("mongoose");

const schema = new Schema({
  id:String,
  name: String,
  email: String,
  password: String,
  todos: Array,
});

module.exports = schema;
