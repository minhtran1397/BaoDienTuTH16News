var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from user');
  },

  allCate:() => {
    return db.load('select * from category');
  },
  
  allTag: ()=>{
    return db.load("select * from tag");
  },

  getCateById: id => {
    return db.load(`select * from category where id = ${id}`);
  },

  getAcc: id => {
    return db.load(`select * from user where id = ${id}`);
  },

  single: id => {
    return db.load(`select * from user where id = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from user where username = '${userName}'`);
  },

  add: entity => {
    return db.add('user', entity);
  },

  update: entity => {
    // var id = entity.id;
    // delete entity.id;
    return db.update('user', 'id', entity);
  },

  changePass: entity => {
    return db.update('user', 'id', entity);
  },

  delete: id => {
    return db.delete('user', 'id', id);
  }
};
