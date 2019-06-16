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
		,summary,content,datePost, image, premium, idTag,t.name as tagName, idCategory, idWriter, views, c.name as catName, DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated
    FROM article a, category c, tag t
    WHERE a.allow='Allowed' and a.idCategory= c.id  and datePost <= DATE(NOW()) and idTag=t.id
    and idCategory=  ${id}	
    ORDER BY a.datePost desc 
    `);
  },

  //Tất cả thông tin bài viết của nhiều chuyên mục
  allByAllCatAllowedInfo: () => {
    return db.load(`
    SELECT a.id, title
		,summary,content,datePost, image, premium, idTag,t.name as tagName, idCategory, idWriter, views, c.name as catName, DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated
    FROM ((article a join  category c on a.idCategory=c.id)
        join tag t  on  idTag=t.id)
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
    SELECT a.id, idCategory, title, views,idTag,t.name as tagName, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,image,premium
    FROM article a, category c, tag t
    WHERE idCategory=c.id 
					and a.allow='Allowed'   
					and datePost <= DATE(NOW())
					and idTag=t.id
    ORDER BY a.views desc 
    limit 15;
    `);
  },
  top10Newest:()=>{
    return db.load(`
    SELECT a.id, idCategory, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,idTag,t.name as tagName, image, premium
    FROM article a, category c, tag t
    WHERE idCategory=c.id and a.allow='Allowed'  and datePost <= DATE(NOW()) and idTag=t.id
    ORDER BY a.datePost desc 
    limit 10;
    `);
  },

  top1Newest:()=>{
    return db.load(`
    SELECT a.id, idCategory, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,idTag,t.name as tagName, image, premium
    FROM article a, category c, tag t
    WHERE idCategory=c.id and a.allow='Allowed'  and datePost <= DATE(NOW()) and idTag=t.id
    ORDER BY a.datePost desc 
    limit 1 OFFSET 0;
    `);
  },

  top5Newest:()=>{
    return db.load(`
    SELECT a.id, idCategory, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,idTag,t.name as tagName, image, premium
    FROM article a, category c, tag t
    WHERE idCategory=c.id and a.allow='Allowed'  and datePost <= DATE(NOW()) and idTag=t.id
    ORDER BY a.datePost desc 
    limit 5 OFFSET 0;
    `);
  },
  top5to10Newest:()=>{
    return db.load(`
    SELECT a.id, idCategory, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,idTag,t.name as tagName, image, premium
    FROM article a, category c, tag t
    WHERE idCategory=c.id and a.allow='Allowed'  and datePost <= DATE(NOW()) and idTag=t.id
    ORDER BY a.datePost desc 
    limit 5 OFFSET 5;
    `);
  },
  // top10to15:()=>{
  //   return db.load(`
  //   SELECT a.id, title, views, c.name as catName,DATE_FORMAT(datePost,'%d/%m/%Y') AS datePostFormated,tag, image
  //   FROM article a, category c
  //   WHERE idCategory=c.id and a.allow='Allowed'  and datePost <= DATE(NOW())
  //   ORDER BY a.datePost desc 
  //   limit 5 OFFSET 10;
  //   `);
  // },

  top1NewestEachCate:()=>{
    return db.load(`
    SELECT a.id, a.idCategory, a.title, DATE_FORMAT(a.datePost,'%d/%m/%Y') AS datePostFormated, c.name as catName, c.id as catID, a.image, a.summary,premium    
    FROM((article a INNER JOIN (SELECT MAX(ar.datePost) AS maxdate,idCategory FROM article ar GROUP BY idCategory) maxDateByCatTable 
                    ON a.idCategory = maxDateByCatTable.idCategory AND a.datePost = maxDateByCatTable.maxdate)
          INNER JOIN category c	
          ON a.idCategory=c.id)
    ORDER BY c.id ASC;				
    `);
  },

};
