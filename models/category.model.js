var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from category');
  },

  allWithDetails: () => {
    return db.load(`
      select c.id, c.name, count(p.id) as num_of_articles
      from category c left join article p on c.id = p.id
      group by c.id, c.name
    `);
  },

  single: id => {
    return db.load(`select * from category where CatID = ${id}`);
  },

  add: entity => {
    return db.add('category', entity);
  },

  update: entity => {
    return db.update('category', 'CatID', entity);
  },

  delete: id => {
    return db.delete('category', 'CatID', id);
  },
};
