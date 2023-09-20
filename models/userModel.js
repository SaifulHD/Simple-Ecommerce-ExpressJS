const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  nama_lengkap: {
    type: String,
  },
  nohp: {
    type: String,
  },
  email: {
    type: String,
  },
  tanggal_registrasi: {
    type: Date,
    default: Date.now,
  },
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, "User");
module.exports = mongoose.model("User", userSchema);
