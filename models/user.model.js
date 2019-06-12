var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from user');
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
    var id = entity.f_ID;
    delete entity.f_ID;
    return db.update('users', 'id', entity, id);
  },

  delete: id => {
    return db.delete('users', 'id', id);
  }
};
