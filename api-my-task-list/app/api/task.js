const { TaskDao, UserDao } = require('../infra')
    , jimp = require('jimp')
    , path = require('path')
    , fs = require('fs')
    , unlink = require('util').promisify(fs.unlink);

const api = {}

const userCanUpdateOrDelete = user => task => task.userId == user.id;

api.list = async (req, res) => {
    console.log('####################################');
    const { userName } = req.params;
    const { page } = req.query;
    const user = await new UserDao(req.db).findByName(userName);
    if(user) {
        console.log(`Listing tasks`);
        const tasks = await new TaskDao(req.db)
            .listAllFromUser(userName, page);
        res.json(tasks);
    } else {
        res.status(404).json({ message: 'User not found'});
    }
    
}

api.listAllFromCategory = async (req, res) => {
    console.log('####################################');
    const { categoryId } = req.params;
    const { page } = req.query;

    console.log(`Listing tasks`);
    const tasks = await new TaskDao(req.db)
        .listAllFromCategory(categoryId, page)
    res.json(tasks);
}

api.add = async (req, res) => {
    console.log('####################################');
    console.log('Received JSON data', req.body);
    const task = req.body;
    const id = await new TaskDao(req.db).add(task, req.user.id);
    res.json(id);
};

api.addUpload = async (req, res) => {

        console.log('upload complete');
        console.log('Task data', req.body);
        console.log('User Id', req.user.id);
        
        const task = req.body;
        await new TaskDao(req.db).add(task, req.user.id);
        res.status(200).end();       
};

api.findById = async (req, res) => {
    const { taskId } = req.params;
    console.log('####################################');
    console.log(`Finding task for ID ${taskId}`)
    const task = await new TaskDao(req.db).findById(taskId);
    if(task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task does not exist'})
    }  
};

api.remove = async (req, res) => {
    const user = req.user;
    const { taskId } = req.params;
    const dao = new TaskDao(req.db);
    const task = await dao.findById(taskId);
    if(!task) {
        const message = 'Task does not exist';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanUpdateOrDelete(user)(task)) {
        await dao.remove(taskId)
        console.log(`Task ${taskId} deleted!`);
        res.status(200).end();
    } else {
        console.log(`
            Forbiden operation. User ${user.id} 
            can delete task from user ${task.userId}
        `);
        res.status(403).json({ message: 'Forbidden'});
    }
};

api.edit = async (req, res) => {
    const user = req.user;
    const { taskId } = req.params;
    const editedTask = req.body;
    const dao = new TaskDao(req.db);
    const task = await dao.findById(taskId);
    if(!task) {
        const message = 'Task does not exist';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanUpdateOrDelete(user)(task)) {
        await dao.edit(taskId, editedTask)
        console.log(`Task ${taskId} updated!`);
        res.status(200).end();
    } else {
        console.log(`
            Forbiden operation. User ${user.id} 
            can update task from user ${task.userId}
        `);
        res.status(403).json({ message: 'Forbidden'});
    }
};

api.finish = async (req, res) => {
    const user = req.user;
    const { taskId } = req.params;
    const dao = new TaskDao(req.db);
    const task = await dao.findById(taskId);
    if(!task) {
        const message = 'Task does not exist';
        console.log(message);
        return res.status(404).json({ message });
    }
    
    if(userCanUpdateOrDelete(user)(task)) {
        await dao.finish(taskId)
        console.log(`Task ${taskId} updated!`);
        res.status(200).end();
    } else {
        console.log(`
            Forbiden operation. User ${user.id} 
            can update task from user ${task.userId}
        `);
        res.status(403).json({ message: 'Forbidden'});
    }
};

module.exports = api;