const express = require('express');
const Article = require('../server/models/Article');
const router = express.Router();

router.get('/', function(req, res) {
  Article.find({})
    .then(response => console.log(response))
    .catch(err => console.log(err))
});


module.exports = router