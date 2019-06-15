var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },
  
  allCate: () => {
    return db.load('select * from category');
  },

  allTag: () => {
    return db.load('select * from tag');
  },

  single: id => {
    return db.load(`select * from article where id = ${id}`);
  },

  singleIdCate: id => {
    return db.load(`select * from category where id = ${id}`);
  },
   
  singleIdTag: id => {
    return db.load(`select * from tag where id = ${id}`);
  },
   
  singleIdCateName: name => {
    return db.load("select * from category where name ='"+name+"'");
  },

  singleIdTagName: name => {
    return db.load("select * from tag where name ='"+name+"'");
  },


  add: entity => {
    return db.add('article', entity);
  },

  addCate: entity => {
    return db.add('category', entity);
  },

  addTag: entity => {
    return db.add('tag', entity);
  },


  updateCate: entity => {
    return db.update('category', 'id', entity);
  },

  updateTag: entity => {
    return db.update('tag', 'id', entity);
  },

  delete: id => {
    return db.delete('article', 'id', id);
  },

  deleteCate: id => {
    return db.delete('category', 'id', id);
  },

  deleteTag: id => {
    return db.delete('tag', 'id', id);
  },
};
