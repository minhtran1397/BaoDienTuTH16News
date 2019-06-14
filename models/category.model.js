var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from category');
  },

  allId:() =>{
    return db.load('select c.id from category c');
  },
  ////Minh sửa lại, vì c.id =p.id là id của article = id của category sẽ ra kết quả không đúng vì phải so dựa trên cùng là id category
  // allWithDetails: () => {
  //   return db.load(`
  //     select c.id, c.name, count(p.id) as num_of_articles
  //     from category c left join article p on c.id = p.id
  //     group by c.id, c.name
  //   `);
  // },
  ////Sau khi sửa
  allWithDetails: () => {
    return db.load(`
    select c.id, c.name , count(a.id) as num_of_articles
    from category c left join article a on c.id = a.idCategory
    group by c.id, c.name
    `);
  },


  //Minh-sửa CatID thành id
  single: id => {
    return db.load(`select * from category where id = ${id}`);
  },

  add: entity => {
    return db.add('category', entity);
  },

  update: entity => {
    return db.update('category', 'CatID', entity);
  },

  delete: id => {
    return db.delete('category', 'CatID', id);
  },

  //Tổng số bài viết trong 1 chuyên mục
  allByCateId: id => {
    return db.load(`select count(a.id)as TongSo from article a where idCategory = ${id}`);
  },
  

};
