const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const isAuth = require('../middleware/isAuth');
const upload= require('../middleware/Upload');
//Protected put in headers token from login --> headers: {Authorization: `Bearer ${token}`}
router.post('/', isAuth, upload.uploadBook.single('coverPhoto'), bookController.createBook);
router.put('/:id', isAuth, bookController.updateBook);
router.delete('/:id', isAuth, bookController.deleteBook);

//Public
router.get('/search', bookController.searchBooks);
router.get('/filter', bookController.filterBooks);
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;
