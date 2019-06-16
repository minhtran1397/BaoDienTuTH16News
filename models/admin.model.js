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

  allUser: () => {
    return db.load('select * from user');
  },

  single: id => {
    return db.load(`select * from article where id = ${id}`);
  },

  single2: id => {
    return db.load(`select a.id as id, c.id as id2, a.title, a.content, a.summary, a.idTag, a.idCategory,
    a.dateWriter, a.datePost, a.allow, c.name as nameCate, t.name as nameTag
     from (article a join category c on a.idCategory = c.id) join tag t on t.id = a.idTag where a.id = ${id}`);
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

  singleIdUser: id => {
    return db.load(`select * from user where id = ${id}`);
  },

  singleIdUser2: id => {
    return db.load(`select a.id as id, c.id as id2, a.name as name, a.email, a.dob, a.role, a.username
    , a.duration, a.nickname, a.idCategory,c.name as nameCate
     from user a join category c on a.idCategory = c.id where a.id = ${id}`);
  },

  singleIdUser3: id => {
    return db.load(`select *
     from user a where a.id = ${id}`);
  },

  add: entity => {
    return db.add('article', entity);
  },

  addUser: entity => {
    return db.add('user', entity);
  },

  addCate: entity => {
    return db.add('category', entity);
  },

  addTag: entity => {
    return db.add('tag', entity);
  },

  addUser: entity => {
    return db.add('user', entity);
  },

  addArticle: entity => {
    return db.add('article', entity);
  },

  updateCate: entity => {
    return db.update('category', 'id', entity);
  },

  updateTag: entity => {
    return db.update('tag', 'id', entity);
  },

  updateUser: entity => {
    return db.update('user', 'id', entity);
  },

  updateArticle: entity => {
    return db.update('article', 'id', entity);
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

  deleteUser: id => {
    return db.delete('user', 'id', id);
  },

  deleteArticle: id => {
    return db.delete('article', 'id', id);
  },

  findUser: id=>{
    return db.load(`select * from user where id = ${id}`);
  },

  allRole: name=>{
    return db.load("select * from user where role='"+name+"'");
  },
};
