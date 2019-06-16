var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from tag');
  },

  single: id => {
    return db.load(`select * from tag where id = ${id}`);
  },

  add: entity => {
    return db.add('tag', entity);
  },

  update: entity => {
    return db.update('tag', 'id', entity);
  },

  delete: id => {
    return db.delete('tag', 'id', id);
  },

  //Tổng số bài viết cùng 1 tag
  allByTagId: id => {
    return db.load(`select count(a.id)as sumArticleByTag from article a where idTag = ${id}`);
  },
  
  top15MostViewTags:  () => {
    return db.load(`
    SELECT a.id, idCategory, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,tag,image,premium
    FROM article a, category c
    WHERE idCategory=c.id and a.allow='Allowed'   and datePost <= DATE(NOW())
    ORDER BY a.views desc 
    limit 15;
    `);
  },
};
