const express = require('express');
const { createBook, getBooks, getBookById, deleteBookById, updateBookById, deactivateBook, updateBookQuantity } = require('../controller/bookController');
const { validateUser } = require('../middleware/jwt');
const router = express.Router();

router.post('/createBook', validateUser, createBook);
router.get('/getBooks', validateUser, getBooks);
router.get('/getBookById/:id',getBookById);
router.delete('/deleteBookById/:id', deleteBookById);
router.put('/updateBookById/:id', updateBookById);
router.put('/deactivateBookById/:id', deactivateBook);
router.put('/updateBookQuantity/:id', updateBookQuantity);

module.exports = router;