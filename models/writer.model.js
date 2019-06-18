var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },
  allCate: () => {
    return db.load('select * from category c join article a on a.idCategory = c.id');
  },

  allCate2:() => {
    return db.load('select * from category');
  },

  allTag: () => {
    return db.load('select * from  tag');
  },

  allCateByIdWriter: id => {
    return db.load(`select * from category c join article a on a.idCategory = c.id where a.idWriter="${id}"`);
  },

  allCategory: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },

  TongSo: () => {
    return db.load('select count(*) as TongSo from article');
  },

  TongSoByIdWriter: id => {
    return db.load(`select count(*) as TongSo from article where idWriter="${id}"`);
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

  single2: id => {
    return db.load(`select a.id as id, c.id as id2, a.title, a.content, a.summary, a.idTag, a.idCategory,
    a.dateWriter, a.datePost, a.allow, a.image, c.name as nameCate, t.name as nameTag
     from (article a join category c on a.idCategory = c.id) join tag t on t.id = a.idTag where a.id = ${id}`);
  },

  singleML: id => {
    return db.load(`select a.image, a.title, a.content, a.summary, a.id, c.name as name,a.datePost, a.dateWriter from article a join category c on c.id = a.idCategory where a.id = ${id}`);
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

  allArticleCate: id=>{
    return db.load(`select * from article a where a.id!= ${id} and a.idCategory = (select a2.idCategory from article a2 where a2.id=${id}) limit 5`);
  }
};
