const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const barangSchema = mongoose.Schema({
  nama_barang: {
    type: String,
    required: true,
  },
  jenis_barang: {
    type: String,
  },
  deskripsi_barang: {
    type: String,
  },
  harga_barang: {
    type: Number,
  },
  tanggal_dibuat: {
    type: Date,
    default: Date.now,
  },
});

autoIncrement.initialize(mongoose.connection);
barangSchema.plugin(autoIncrement.plugin, "barangjual");
module.exports = mongoose.model("barangjual", barangSchema);
