const categoryConverter = row => ({
    id: row.category_id,
    description: row.category_description,
    color: row.category_color,
    userId: row.user_id
})

const maxRows = 10;

class CategoryDao {

    constructor(db) {
        this._db = db;
    }

    add(category, userId) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                    INSERT INTO category (
                        category_description,
                        category_color,
                        user_id
                    ) values (?,?,?)
                `,
                [
                    category.description,
                    category.color,
                    userId,
                ],
                function (err) {
                    if (err) {
                        console.log(err);
                        return reject('Can`t add category');
                    }
                    resolve(this.lastID);
                });
        });
    }

    listAllFromUser(userName, page) {

        const from = (page - 1) * maxRows;

        let limitQuery = '';

        if (page) limitQuery = `LIMIT ${from}, ${maxRows}`;

        return new Promise((resolve, reject) => {
            this._db.all(`
                    SELECT
                        c.category_id, c.category_description, c.category_color, u.user_id
                    FROM
                        category c
                    INNER JOIN user u ON
                        u.user_id = c.user_id
                    WHERE
                        u.user_name = ?
                    ORDER BY
                        c.category_description  
                ${limitQuery} ;
                `,
                [userName],
                (err, rows) => {
                    const categories = rows.map(categoryConverter)
                    if (err) {
                        console.log(err);
                        return reject('Can`t list categories');
                    }
                    console.log('categorias retornadas');
                    resolve(categories);
                });
        });
    }

    findById(categoryId) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                SELECT
                    c.category_description, c.category_color, u.user_id
                FROM
                    category c
                INNER JOIN user u ON
                    u.user_id = c.user_id
                WHERE
                    c.category_id = ?
                ORDER BY
                    c.category_description
                `,
                [categoryId],
                (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find category');
                }
                if (row) {
                    resolve(categoryConverter(row));
                } else {
                    resolve(null);
                }
            }
            );

        });
    }

    findByDescription(description) {

        return new Promise((resolve, reject) => {
            this._db.get(
                `
                SELECT
                    c.category_description, c.category_color, u.user_id
                FROM
                    category c
                INNER JOIN user u ON
                    u.user_id = c.user_id
                WHERE
                    UPPER(c.category_description) = UPPER(?)
                ORDER BY
                    c.category_description
                `,
                [description],
                (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find category');
                }
                if (row) {
                    resolve(categoryConverter(row));
                } else {
                    resolve(null);
                }
            }
            );

        });
    }

    remove(id) {
        return new Promise((resolve, reject) => this._db.run(
            `DELETE FROM category where category_id = ?`,
            [id],
            err => {
                if (err) {
                    console.log(err);
                    return reject('Can`t remove category');
                }
                resolve();
            }
        ));
    }
}

module.exports = CategoryDao;