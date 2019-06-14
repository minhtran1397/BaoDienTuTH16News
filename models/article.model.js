var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from article');
  },

  // allArticleAllowedInfo: () => {
  //   return db.load(`
  //   SELECT  a.id, a.title, summary, content,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated, 
  //           a.image,a.allow, a.status, a.idTag, idCategory,idEditor,idWriter, c.name as catName,a.premium, w.name as writerName
  //   FROM  category c 
	// 	join article a on a.idCategory=c.id 
	// 	join writer w on a.idWriter=w.id
	// 	WHERE a.allow='Allowed' 	
  //   `);
  // },

  //Tất cả thông tin bài viết của một chuyên mục
  allByCatAllowedInfo: id => {
    return db.load(`
    SELECT a.id, title
		,summary,content,datePost, image, premium, tag, idCategory, idWriter, views, c.name as catName, DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated
    FROM article a, category c
    WHERE a.allow='Allowed' and a.idCategory= c.id  and datePost <= DATE(NOW())
    and idCategory=  ${id}	
    ORDER BY a.datePost desc 
    `);
  },

  //Tất cả thông tin bài viết của nhiều chuyên mục
  allByAllCatAllowedInfo: () => {
    return db.load(`
    SELECT a.id, title
		,summary,content,datePost, image, premium, tag, idCategory, idWriter, views, c.name as catName, DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated
    FROM article a join  category c on a.idCategory=c.id  
    WHERE a.allow='Allowed'  and datePost <= DATE(NOW())
    `);
  },

  single: id => {
    return db.load(`select * from article where id = ${id}`);
  },

  //lấy hết sản phẩm của 1 danh mục
  allByCat: id => {
    return db.load(`select * from category c join article a on a.idCategory = c.id where c.id= "${id}"  and datePost <= DATE(NOW())`);
  },
  top15MostViews:  () => {
    return db.load(`
    SELECT a.id, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,tag,image
    FROM article a, category c
    WHERE idCategory=c.id and a.allow='Allowed'   and datePost <= DATE(NOW())
    ORDER BY a.views desc 
    limit 15;
    `);
  },
  top10Newest:()=>{
    return db.load(`
    SELECT a.id, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,tag, image
    FROM article a, category c
    WHERE idCategory=c.id and a.allow='Allowed'  and datePost <= DATE(NOW())
    ORDER BY a.datePost desc 
    limit 10;
    `);
  },
  // allPremiumArticlesByCatAllowed:id => {
  //   return db.load(`
  //   SELECT a.id, title
	// 	,summary,content,datePost, image, premium, tag, idCategory, idWriter, views, c.name as catName, DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated
  //   FROM article a join  category c on a.idCategory=c.id  
  //   WHERE a.allow='Allowed'  and datePost <= DATE(NOW()) and premium=1 and idCategory=  ${id}	
  //   ORDER BY a.datePost desc 
  //   `);
  // },

  // allNonPremiumArticlesByCatAllowed:id => {
  //   return db.load(`
  //   SELECT a.id, title
	// 	,summary,content,datePost, image, premium, tag, idCategory, idWriter, views, c.name as catName, DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated
  //   FROM article a join  category c on a.idCategory=c.id  
  //   WHERE a.allow='Allowed'  and datePost <= DATE(NOW()) and premium=0 and idCategory=  ${id}	
  //   ORDER BY a.datePost desc 
  //   `);
  // },

};
