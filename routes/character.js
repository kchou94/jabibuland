const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/new', function(req, res){
    res.render('character/new', { title: 'New Character' });
});

module.exports = router;