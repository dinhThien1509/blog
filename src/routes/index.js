const newRouter = require('./home');
const searchRouter = require('./search');
const courseRouter = require('./course');
const meRouter = require('./me');

function route(app) {
    app.use('/courses', courseRouter);

    app.use('/me', meRouter);

    app.use('/', newRouter, searchRouter, meRouter);
}

module.exports = route;
