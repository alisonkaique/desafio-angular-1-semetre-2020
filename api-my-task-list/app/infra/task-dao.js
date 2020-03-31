const taskConverter = row => ({
    id: row.task_id,
    title: row.task_title,
    description: row.task_description,
    createDate: new Date(row.task_create_date),
    deadLine: new Date(row.task_deadline),
    status: row.task_status,
    categoryId: row.category_id,
    category: row.category_description,
    userId: row.user_id,
});

const maxRows = 10;

class TaskDao {

    constructor(db) {
        this._db = db;
    }

    listAllFromUser(userName, page) {

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT t.task_id, t.task_title, t.task_description, t.task_create_date,
                    t.task_deadline, t.task_status, c.category_id, c.category_description, t.user_id
                FROM task AS t
                        JOIN
                        user AS u ON t.user_id = u.user_id
                        JOIN
                        category AS c ON t.category_id = c.category_id
                WHERE u.user_name = ?
                ORDER BY t.task_deadline, c.category_description, t.task_status, t.task_title
                ${limitQuery} ;
                `,
                [userName],
                (err, rows) => {
                    const tasks = rows.map(taskConverter)
                    if (err) {
                        console.log(err);
                        return reject('Can`t list tasks');
                    }
                    console.log('tarefas retornadas');
                    resolve(tasks);
                });
        });
    }

    add(task, user_id) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO task (
                    task_title,
                    task_description,
                    task_create_date,
                    task_deadline,
                    task_status,
                    category_id,
                    user_id
                ) values (?,?,?,?,?,?,?)
            `,
                [
                    task.title,
                    task.description,
                    new Date(),
                    new Date(task.deadLine),
                    task.status,
                    task.category,
                    user_id
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t add task');
                    }
                    resolve(this.lastID);
                });
        });
    }

    edit(taskId, task) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                    UPDATE
                        task
                    SET
                        task_title = ?,
                        task_description = ?,
                        task_deadline = ?,
                        category_id = ?
                    WHERE
                        task_id = ?
            `,
                [
                    task.title,
                    task.description,
                    new Date(task.deadLine),
                    task.category,
                    taskId
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t edit task');
                    }
                    resolve(this.lastID);
                });
        });
    }

    findById(id) {

        return new Promise((resolve, reject) => this._db.get(`
            SELECT t.task_id, t.task_title, t.task_description, t.task_create_date,
                t.task_deadline, t.task_status, c.category_id, c.category_description, t.user_id
            FROM task AS t
                    JOIN
                    category AS c ON t.category_id = c.category_id
            WHERE t.task_id = ?;
            `,
            [id],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find task');
                }
                if (row) {
                    resolve(taskConverter(row));
                } else {
                    resolve(null);
                }
            }
        ));
    }

    listAllFromCategory(categoryId, page) {

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
                SELECT t.task_id, t.task_title, t.task_description, t.task_create_date,
                    t.task_deadline, t.task_status, c.category_id, c.category_description, t.user_id
                FROM task AS t
                        JOIN
                        category AS c ON t.category_id = c.category_id
                WHERE c.category_id = ?
                ORDER BY t.task_deadline, c.category_description, t.task_status, t.task_title
                ${limitQuery} ;
                `,
                [categoryId],
                (err, rows) => {
                    const tasks = rows.map(taskConverter)
                    if (err) {
                        console.log(err);
                        return reject('Can`t list tasks');
                    }
                    console.log('tarefas retornadas');
                    resolve(tasks);
                });
        });
    }

    finish(id) {
        return new Promise((resolve, reject) => this._db.run(
            `UPDATE task SET task_status = 2 where task_id = ?`,
            [id],
            err => {
                if (err) {
                    console.log(err);
                    return reject('Can`t update task');
                }
                resolve();
            }
        ));
    }

    remove(id) {
        return new Promise((resolve, reject) => this._db.run(
            `DELETE FROM task where task_id = ?`,
            [id],
            err => {
                if (err) {
                    console.log(err);
                    return reject('Can`t remove task');
                }
                resolve();
            }
        ));
    }
}

module.exports = TaskDao;