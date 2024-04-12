var express  = require('express');
var router = express.Router();
const Teachers = require('../models/teachers');


//thêm 
const Upload = require('../config/common/upload');
// lấy dữ liệu
router.get('/get-list', async (req, res) => {
    try {
        const result = await Teachers.find();
        if (result) {
            res.json({
                "status": 200,
                "message": "Lấy dữ liệu thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "Lấy dữ liệu thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//add dữ liệu
router.post('/add', Upload.single('hinhanh_ph36893'),async (req, res) => {
    try {
        const data = req.body;
        const { file } = req;
        const newTeacher = new Teachers({
            hoten_ph36893: data.hoten_ph36893,
            quequan_ph36893: data.quequan_ph36893,
            luong_ph36893: data.luong_ph36893,
            chuyennganh_ph36893: data.chuyennganh_ph36893,
            hinhanh_ph36893: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
        });

        const result = await newTeacher.save();
        if (result) {
            res.json({
                "status": 200,
                "message": "Thêm mới thành công",
                "data": result
            });
        } else {
            res.json({
                "status": 400,
                "message": "Thêm mới thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});




//Update
router.put("/update/:id", Upload.single('hinhanh_ph36893'),async (req, res) => {
    try {
        const { id } = req.params;
        const {file} = req;
        const data = req.body;
        const updateTeacher = await Teachers.findById(id);
        let result = null;
        if (updateTeacher) {
            if (file) {
                updateTeacher.hinhanh_ph36893 = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
            }
            updateTeacher.hoten_ph36893 = data.hoten_ph36893 ?? updateTeacher.hoten_ph36893;
            updateTeacher.quequan_ph36893 = data.quequan_ph36893 ?? updateTeacher.quequan_ph36893;
            updateTeacher.luong_ph36893 = data.luong_ph36893 ?? updateTeacher.luong_ph36893;
            updateTeacher.chuyennganh_ph36893 = data.chuyenNganh_PH36760 ?? updateTeacher.chuyennganh_ph36893
            result = await updateTeacher.save();
            if (result) {
                res.json({
                    "status": 200,
                    "message": "Cập nhật thành công",
                    "data": result
                })
            } else {
                res.json({
                    "status": 400,
                    "message": "Cập nhật thất bại",
                    "data": []
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
});

// Xoá
router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Teachers.findByIdAndDelete(id);
        if (result) {
            res.json({
                "status": 200,
                "message": "Xóa thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "message": "Xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
});

//tìm kiếm 
router.get('/search', async function (req, res) {
    try {
        const key = req.query.key;
        const data = await Teachers.find({ hoTen_PH36760: { "$regex": key, "$options": "i" } })
            .sort({ createdAt: -1 });
        if (data) {
            res.json({
                status: 200,
                messenger: "Tìm thành công",
                data: data,
            });
        } else {
            res.json({
                status: 400,
                messenger: "tìm thất bại",
                data: [],
            });
        }
    } catch (error) {
        console.log(error);
    }
})


 module.exports = router;