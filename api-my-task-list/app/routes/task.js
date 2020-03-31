const { taskAPI } = require('../api'),
    path = require('path'),
    { wrapAsync, auth } = require('../infra')

module.exports = app => {

    app.route('/:userName/tasks')
        .get(wrapAsync(taskAPI.list));
    
    app.route('/tasks/upload')
        .post(auth, wrapAsync(taskAPI.addUpload))
    
    app.route('/tasks/finish/:taskId')
        .post(auth, wrapAsync(taskAPI.finish))

        app.route('/tasks/edit/:taskId')
        .post(auth, wrapAsync(taskAPI.edit))

    app.route('/tasks/category/:categoryId')
        .get(wrapAsync(taskAPI.listAllFromCategory))

    app.route('/tasks/:taskId')
        .post(auth, wrapAsync(taskAPI.add))
        .delete(auth, wrapAsync(taskAPI.remove))
        .get(wrapAsync(taskAPI.findById));

};