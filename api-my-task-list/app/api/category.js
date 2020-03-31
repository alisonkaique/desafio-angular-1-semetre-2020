const { CategoryDao, UserDao } = require('../infra');

const api = {};

const userCanDelete = user => category => category.userId == user.id;

api.add = async (req, res) => {
    
    const { userName } = req.params;
    const { categoryDescription } = req.body;

    const categoryDao = new CategoryDao(req.db);
    const userDao = new UserDao(req.db);

    const user = await userDao.findByName(userName);

    const categoryId = await categoryDao.add(categoryDescription, user.id);
    const category = await categoryDao.findById(categoryId);
    console.log(`Category added`, category);
    res.json(category);
};

api.addUpload = async (req, res) => {

    console.log('upload complete');
    console.log('Category data', req.body);
    console.log('User Id', req.user.id);
    
    const category = req.body;
    await new CategoryDao(req.db).add(category, req.user.id);
    res.status(200).end();       
};

api.listAllFromUser = async (req, res) => {

    console.log('####################################');
    const { userName } = req.params;
    const { page } = req.query;
    const user = await new UserDao(req.db).findByName(userName);
    if(user) {
        console.log(`Listing categories`);
        const categories = await new CategoryDao(req.db)
            .listAllFromUser(userName, page);
        res.json(categories);
    } else {
        res.status(404).json({ message: 'User not found'});
    }
}

api.findById = async (req, res) => {
    const { categoryId } = req.params;
    console.log('####################################');
    console.log(`Finding category for ID ${categoryId}`)
    const category = await new CategoryDao(req.db).findById(categoryId);
    if(category) {
        res.json(category);
    } else {
        res.status(404).json({ message: 'Category does not exist'})
    }  
};

api.checkCategoryTaken = async (req, res) => {
    const { description } = req.params;
    const category = await new CategoryDao(req.db).findByDescription(description);
    res.json(!!category);
};

api.remove = async (req, res) => {
    const user = req.user;
    const { categoryId } = req.params;
    const dao = new CategoryDao(req.db);
    const category = await dao.findById(categoryId);
    if(!category) {
        const message = 'Category does not exist';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanDelete(user)(category)) {
        await dao.remove(categoryId)
        console.log(`Category ${categoryId} deleted!`);
        res.status(200).end();
    } else {
        console.log(`
            Forbiden operation. User ${user.id} 
            can delete category from user ${category.userId}
        `);
        res.status(403).json({ message: 'Forbidden'});
    }
};

module.exports = api;