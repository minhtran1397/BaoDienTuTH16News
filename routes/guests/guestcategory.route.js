//Khai báo hàm controller
var express=require('express');
var router = express.Router();
//khai báo model
var guestcategoryModel = require('../../models/category.model');

//router cho root(guestcategory ) của Req 1 - Guest
router.get('/', (req, res) => {
    guestcategoryModel.all()
      .then(rows => {
        res.render('Req 1 - Guest/vwCategories/indexcategory', {
          category: rows
        });
      }).catch(err => {
        console.log(err);
        res.end('error occured.')
      });
  })

  // //router chi tiết category của Req 1 - Guest
  // router.get('/:id', (req, res) => {
  //   var id = req.params.id;
  //   if (isNaN(id)) {
  //     res.render('Req 1 - Guest/vwCategories/detailscategory', {
  //       error: true
  //     });
  //   }
  //   guestcategoryModel.single(id).then(rows => {
  //     if (rows.length > 0) {
  //       res.render('Req 1 - Guest/vwCategories/detailscategory', {
  //         error: false,
  //         category: rows[0]
  //       });
  //     } else {
  //       res.render('Req 1 - Guest/vwCategories/detailscategory', {
  //         error: true
  //       });
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //     res.end('error occured.')
  //   });
  // })


module.exports=router;