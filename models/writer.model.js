var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },
  allCate: () => {
    return db.load('select * from category c join article a on a.idCategory = c.id');
  },

  allCategory: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },

  TongSo: () => {
    return db.load('select count(*) as TongSo from article');
  },

  TongSoAllow: id => {
    return db.load("select count(*)as TongSo from article where allow= '"+id+"'");
  },

  allByCate: id => {
    return db.load(`select * from category c join article a on a.idCategory = c.id where c.id= "${id}"`);
  },
  
  allByAllow: name => {
    return db.load("select * from category c join article a on a.idCategory = c.id where a.allow='"+name+"'");
  },


  allWithDetails: () => {
    return db.load(`
      select c.id, c.name, count(p.id) as num_of_articles
      from category c left join article p on c.id = p.id
      group by c.id, c.name
    `);
  },

  single: id => {
    return db.load(`select * from article where id = ${id}`);
  },

  singleML: id => {
    return db.load(`select a.title, a.content, a.summary, a.id, c.name as name from article a join category c on c.id = a.idCategory where a.id = ${id}`);
  },

  // pageByCat: ( limit, offset) => {
  //   return db.load(`select * from article limit ${limit} offset ${offset}`);
  // },

  countByCat:() => {
    return db.load(`select count(*) as total from article`);
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
