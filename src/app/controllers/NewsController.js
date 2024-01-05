const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../until/mongoose');
class NewsController {
    // [GET] /news
    // c1: Xử lý lỗi tại phương thức
    // async home(req, res) {
    //     try {
    //         // Truy vấn MongoDB để lấy tất cả các bản ghi từ collection Course.
    //         const data = await Course.find({});

    //         // Gửi phản hồi về cho client dưới dạng JSON chứa dữ liệu vừa lấy được.
    //         res.json(data);
    //     }  catch (err) {
    //         res.status(400).json({error: err});
    //      }
    // c2: Xử lý lỗi ở nơi khác
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }
}

//có tác dụng xuất (export) một thể hiện mới của lớp NewsController từ module.
module.exports = new NewsController();
