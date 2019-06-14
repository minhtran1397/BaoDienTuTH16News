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
    var id = entity.id;
    delete entity.id;
    return db.update('user', 'id', entity, id);
  },

  delete: id => {
    return db.delete('user', 'id', id);
  }
};
