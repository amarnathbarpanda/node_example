const express = require('express');
const { createAuthor, getAuthors, updateAuthor, deleteAuthor, getAuthorById } = require('../controller/authorController');
const { validateUser } = require('../middleware/jwt');
const router = express.Router();

router.post('/createAuthor', validateUser, createAuthor);
router.get('/getAuthors', validateUser, getAuthors);
router.put('/updateAuthor/:id', validateUser, updateAuthor);
router.delete('/deleteAuthor/:id', validateUser,deleteAuthor);
router.get('/getAuthorById/:id', validateUser, getAuthorById);

module.exports = router;