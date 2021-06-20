const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = { AdminSchema, Admin };
