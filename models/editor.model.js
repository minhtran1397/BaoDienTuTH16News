var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },
  
  allCate2: () => {
    return db.load('select * from category');
  },

  allTag: () => {
    return db.load('select * from tag');
  },

  allAllow:()=>{
    return db.load('select count(*)as tongso from article where allow = "Allowed"');
  },

  allBlock:()=>{
    return db.load('select count(*) as tongso from article where allow="Blocked"');
  },


  allAllowById: id => {
    return db.load(`select count(*) as tongso from article where idEditor = ${id} and allow="Allowed"`);
  },

  allBlockById: id => {
    return db.load(`select count(*) as tongso from article where idEditor = ${id} and allow="Blocked"`);
  },

  allByIdEditor: id => {
    return db.load(`select * from article where idCategory = ${id} and allow="WaitForAd"`);
  },

  allByIdEditorAllowed: idEditor => {
    return db.load(`select * from article where allow="Allowed" and idEditor=${idEditor}`);
  },

  allByIdEditorBlocked: idEditor  => {
    return db.load(`select * from article where allow="Blocked" and idEditor=${idEditor}`);
  },


  allByCate: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },

  TongSo: () =>{
    return db.load('select count(*) as TongSo from article')
  },

  allCate: ()=>{
    return db.load('SELECT count(*) as tongSo,c.name FROM article a join category c on a.idCategory = c.id group by c.id,c.name ');
  },

//   allWithDetails: () => {
//     return db.load(`
//       select c.CatID, c.CatName, count(p.ProID) as num_of_products
//       from categories c left join products p on c.CatID = p.CatID
//       group by c.CatID, c.CatName
//     `);
//   },

  single: id => {
    return db.load(`select * from article where id = ${id}`);
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

  updateTagAndCate: entity => {
    return db.update('article', 'id', entity);
  },

  delete: id => {
    return db.delete('article', 'id', id);
  },
};
