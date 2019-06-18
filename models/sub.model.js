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

  // singleML: id => {
  //   return db.load(`select a.premium, a.image, a.title, a.content, a.summary, a.id, c.name as name,a.idCategory, a.datePost, a.dateWriter,a.premium from article a join category c on c.id = a.idCategory where a.id = ${id}`);
  // },
  
  // thêm Writer vào singleML
  singleML: id => {
    return db.load(`select a.premium, a.image, a.title, a.content, a.summary, a.id, c.name as name,DATE_FORMAT(a.datePost,'%d/%m/%Y') AS datePostFormated,
    a.idCategory, a.datePost, a.dateWriter, w.nickname as writerName, w.image as writerImage
from (article a join category c on c.id = a.idCategory )
    join ((SELECT id,nickname,image from user u WHERE role ="writer") as w) on w.id=a.idWriter
where a.id = ${id}
`);
  },

  allCategory: () => {
    return db.load('select count(*) as soCate, c.name as name from article a join category c on c.id=a.idCategory group by c.id, c.name');
  },

  allSearch: name => {
    return db.load("select * from article where title like '%"+name+"%' or content like '%"+name+"%' or summary like '%"+name+"%'");
  },

  //5 bài viết cùng chuyên mục
  // allArticleCate: id=>{
  //   return db.load(`select * from article a where a.id!= ${id} and a.idCategory = (select a2.idCategory from article a2 where a2.id=${id}) and allow='Allowed' and datePost <= DATE(NOW()) limit 5`);
  // },
  // thêm catname để hiển thị cho dễ biết
    allArticleCate: id=>{
      return db.load(`select a.id,a.title, a.summary, a.content,a.premium, a.idCategory,image,
                      DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated, c.name as catName 
      from article a, category c 
      where a.id!= 1 and a.idCategory = (select a2.idCategory from article a2 where a2.id=1) 
                                    and allow='Allowed' and datePost <= DATE(NOW()) limit 5`);
    },

  allTag: ()=>{
    return db.load("select * from tag");
  },

  allGetTag: id =>{
    return db.load(`select * from article where idTag=${id}`);
  },
};
