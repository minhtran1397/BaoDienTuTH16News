var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },

  allByCate: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },

//   allWithDetails: () => {
//     return db.load(`
//       select c.CatID, c.CatName, count(p.ProID) as num_of_products
//       from categories c left join products p on c.CatID = p.CatID
//       group by c.CatID, c.CatName
//     `);
//   },

  single: id => {
    return db.load(`select * from article where id = ${id}`);
  },

  add: entity => {
    return db.add('article', entity);
  },
  
  addTag: entity => {
    return db.add('tag', entity);
  },

  update: entity => {
    return db.update('article', 'id', entity);
  },

  delete: id => {
    return db.delete('article', 'id', id);
  },
};
