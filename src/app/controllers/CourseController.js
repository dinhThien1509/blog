const Course = require('../models/Course');
const { mongooseToObject } = require('../../until/mongoose');
const { mutipleMongooseToObject } = require('../../until/mongoose');

class CourseController {
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }
    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        const fromData = req.body;
        fromData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )
            .catch(next);
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    // [Delete] /courses/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // [Delete] /courses/:id/force
    force(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormAction(req, res, next) {
        const action = req.body.action;
        const id = req.body.courseIds;
        switch (action) {
            case 'delete':
                Course.delete({ _id: { $in: id } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                next();
        }
    }
    // [POST] /courses/restore-form-actions
    restoreFormAction(req, res, next) {
        const action = req.body.action;
        const id = req.body.courseIds;
        switch (action) {
            case 'restore':
                Course.restore({ _id: { $in: id } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                next();
        }
    }
}

//có tác dụng xuất (export) một thể hiện mới của lớp NewsController từ module.
module.exports = new CourseController();
