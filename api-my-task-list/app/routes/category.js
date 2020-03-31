const { categoryAPI } = require('../api'),
    path = require('path'),
    { wrapAsync, auth } = require('../infra')

module.exports = app => {

    app.route('/:userName/categories')
        .get(wrapAsync(categoryAPI.listAllFromUser));
    
    app.route('/categories/upload')
        .post(auth, wrapAsync(categoryAPI.addUpload))

    app.route('/category/exists/:description')
        .get(wrapAsync(categoryAPI.checkCategoryTaken));

    app.route('/categories/:categoryId')
        .post(auth, wrapAsync(categoryAPI.add))
        .delete(auth, wrapAsync(categoryAPI.remove))
        .get(wrapAsync(categoryAPI.findById));
};