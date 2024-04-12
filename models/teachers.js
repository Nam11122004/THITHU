const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Teachers = new Schema({
    hoten_ph36893: { type: String, required: true },
    quequan_ph36893: { type: String, required: true },
    luong_ph36893: { type: Number, required: true, default: 0 },
    chuyennganh_ph36893: { type: String },
    hinhanh_ph36893: { type: String },
}, {
    timestamps: true,
});
module.exports = mongoose.model("teacher", Teachers);