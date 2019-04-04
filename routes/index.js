var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
//    var data: {
//        otherData: 'Something Else'
//    };
//    req.vueOptions: {
//        head: {
//            title: 'Page Title',
//            metas: [
//                { property:'og:title', content: 'Page Title'},
//                { name:'twitter:title', content: 'Page Title'},
//            ]
//        }    
//    }
    res.renderVue('../../views/main.vue');
//    res.renderVue('main.vue', data, req.vueOptions);
//  res.render('index', { title: 'Express' });
});

module.exports = router;
