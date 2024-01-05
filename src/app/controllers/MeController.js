const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class MeController {
    // [GET] /stored/courses
    storeCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }

    // [GET] /trash/courses
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

//có tác dụng xuất (export) một thể hiện mới của lớp NewsController từ module.
module.exports = new MeController();
