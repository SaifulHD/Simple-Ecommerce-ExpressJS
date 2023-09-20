const barangModel = require("../models/barangModel");
const e = require("express");

//SAVE BARANG
const createBarang = async (req, res) => {
  const barang = new barangModel({
    nama_barang: req.query.namabarang,
    jenis_barang: req.query.jenisbarang,
    deskripsi_barang: req.query.deskripsibarang,
    harga_barang: req.query.hargabarang,
  });

  // FIELD REQUIRED
  if (
    req.query.namabarang == null ||
    req.query.jenisbarang == null ||
    req.query.deskripsibarang == null ||
    req.query.hargabarang == null
  ) {
    res.status(400).json({ message: "Harap isi semua field!!" });
  }

  try {
    const savedBarang = await barang.save();
    res.status(200).json({ message: "Barang berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteBarang = async (req, res) => {
  try {
    const deleteBarang = await barangModel.deleteOne({
      _id: req.params.id,
    });
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const updateBarang = async (req, res) => {
  try {
    const updateBarang = await barangModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        nama_barang: req.body.namabarang,
        jenis_barang: req.body.jenisbarang,
        deskripsi_barang: req.body.deskripsibarang,
        harga_barang: req.body.hargabarang,
      }
    );
    res.status(200).json({ message: "Produk berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
const viewBarang = async (req, res) => {
  try {
    const countBarang = await barangModel.countDocuments();
    const viewBarang = await barangModel.findOne({
      nama_barang: req.query.namabarang,
      jenis_barang: req.query.jenisbarang,
    });
    res.status(200).json({
      result: viewBarang,
      Total: countBarang,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
//count barang
// const countBarang = async (req, res) => {
//   try {
//     const countBarang = await barangModel.countDocuments();
//     res.status(200).json({ message: "Jumlah barang: " + countBarang });
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// };
module.exports = { createBarang, deleteBarang, updateBarang, viewBarang };
