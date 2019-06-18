var express = require('express');
var articleModel = require('../../models/article.model');
var guestCatModel = require('../../models/category.model');
var subModel = require('../../models/sub.model');

var router = express.Router();

//Nếu có ai truye cập vào ds mục 1 => lấy các sp danh mục 1 show cho họ
router.get('/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('Req 1 - Guest/vwCategories/detailscategory/1', {
      error: true
    });
  }
  Promise.all([
    articleModel.allByCatAllowedInfo(id),
    guestCatModel.single(id),
    guestCatModel.allByCateId(id),
    articleModel.allByAllCatAllowedInfo(),
    articleModel.top15MostViews(),
    articleModel.top10Newest(),
    subModel.allTag()
    // articleModel.allPremiumArticlesByCatAllowed(),
    // articleModel.allNonPremiumArticlesByCatAllowed(),
    ]).then(([rows,rows2,rows3,rows4,rows5,rows6, rows7
      // ,rows7,rows8
      ]) => {
      // console.log(res.locals.lcGCategories);

      // for (const c of res.locals.lcCategories) {
      //   if (c.CatID === +id) {
      //     c.isActive = true;
      //   }
      // }
      
      res.render('Req 1 - Guest/vwCategories/detailscategory', {
        article: rows,
        category: rows2[0],
        tongso: rows3[0],
        allarticle: rows4,
        articlemostviews:rows5,
        topnewest:rows6,
        tag:rows7
        // premiumarticles:rows7,
        // nonpremiumarticles:rows8
      });
    }).catch(err => {
      console.log(err);
      res.end('error occured.')
    });
})

module.exports = router;
