const express = require('express');
const router = express.Router();

router.use('/users', require('./users.routes'));
router.use('/bests', require('./ilchonpyungs.routes'));
router.use('/diaries', require('./diaries.routes'));
router.use('/diaries/comments', require('./comments.routes'));
router.use('/guestbooks', require('./guestBooks.routes'));
module.exports = router;