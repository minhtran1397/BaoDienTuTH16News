var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },
  
  allArticlePrenium: () => {
    return db.load("select a.premium, a.image, a.id as id, a.title,a.summary,u.name as username, c.name as catename from (article a join user u on a.idWriter = u.id) join category c on c.id = a.idCategory where premium='1'");
  },

  allArticlePreniumF: () => {
    return db.load("select a.premium, a.image, a.id as id, a.title,a.summary,u.name as username, c.name as catename from (article a join user u on a.idWriter = u.id) join category c on c.id = a.idCategory where premium=''");
  },

  allCate: ()=>{
    return db.load('SELECT count(*) as tongSo,c.name FROM article a join category c on a.idCategory = c.id group by c.id,c.name ');
  },

  singleML: id => {
    return db.load(`select a.premium, a.image, a.title, a.content, a.summary, a.id, c.name as name,a.datePost, a.dateWriter,a.premium from article a join category c on c.id = a.idCategory where a.id = ${id}`);
  },

  allCategory: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },

  allSearch: name => {
    return db.load("select * from article where title like '%"+name+"%' or content like '%"+name+"%' or summary like '%"+name+"%'");
  },

  allArticleCate: id=>{
    return db.load(`select * from article a where a.id!= ${id} and a.idCategory = (select a2.idCategory from article a2 where a2.id=${id}) and allow='Allowed' limit 5`);
  },

  allTag: ()=>{
    return db.load("select * from tag");
  },

  allGetTag: id =>{
    return db.load(`select * from article where idTag=${id}`);
  },
};
