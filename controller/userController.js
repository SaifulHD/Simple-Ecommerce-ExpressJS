const userModel = require("../models/userModel");
const e = require("express");
var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// SAVE USER
const saveUser = async (req, res) => {
  const password_hash = bcrypt.hashSync(req.body.p_password, salt);
  const user = new userModel({
    username: req.body.p_username,
    password: password_hash,
    nama_lengkap: req.body.p_nama_lengkap,
    nohp: req.body.p_nohp,
    email: req.body.p_email,
  });

  // FIELD REQUIRED
  if (
    req.body.p_username == null ||
    req.body.p_password == null ||
    req.body.p_nama_lengkap == null ||
    req.body.p_nohp == null ||
    req.body.p_email == null
  ) {
    res.status(400).json({ message: "Harap isi semua field!!" });
  }

  try {
    const savedUser = await user.save();
    res.status(201).json({ message: "User berhasil register!!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  const getUser = await userModel.findOne({
    username: req.body.p_username,
  });

  try {
    var cek = bcrypt.compareSync(req.body.p_password, getUser.password);
    if (cek == true) {
      res.status(200).json({ message: "Selamat Datang!!" });
    } else {
      res.status(400).json({ message: "Password Salah" });
    }
  } catch (error) {
    res.status(400).json({ message: error, Pesan: "Username tidak ada" });
  }
};

const getUser = async (req, res) => {
  const getUser = await userModel.findOne({
    _id: req.params.id,
  });
  try {
    res.status(200).json(getUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// const loginUser = async (req, res) => {
//   const getUser = await userModel.findOne({
//     _id: req.body.p_username,
//   });
//   try {
//     res.status(200).json({
//       //get nama lengkap
//       result: getUser,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };
module.exports = { getAllUsers, saveUser, loginUser, getUser };
