var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },
  
  allArticlePrenium: () => {
    return db.load("select a.id as id, a.title,a.summary,u.name as username, c.name as catename from (article a join user u on a.idWriter = u.id) join category c on c.id = a.idCategory where premium='1'");
  },

  allArticlePreniumF: () => {
    return db.load("select a.id as id, a.title,a.summary,u.name as username, c.name as catename from (article a join user u on a.idWriter = u.id) join category c on c.id = a.idCategory where premium=''");
  },

  allCate: ()=>{
    return db.load('SELECT count(*) as tongSo,c.name FROM article a join category c on a.idCategory = c.id group by c.id,c.name ');
  },

  singleML: id => {
    return db.load(`select a.title, a.content, a.summary, a.id, c.name as name,a.datePost, a.dateWriter,a.premium from article a join category c on c.id = a.idCategory where a.id = ${id}`);
  },

  allCategory: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },
};
