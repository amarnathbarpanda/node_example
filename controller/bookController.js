const Author = require('../model/Author');
const Book = require('../model/Book');


exports.createBook = async (req, res) =>{
    
    try{
        const book = await Book.findOne({name: req.body.name});
    if(book){
        return res.status(200).json({message: "Book already exists"});
    }

    const author = await Author.findOne({_id: req.body.author});
    console.log(author);
    if(!author){
        return res.status(400).json({message: "Invalid author"});
    }

    const newBook = await Book.create(req.body);

    return res.status(200).json({message: "Book created successfully!"});

    }catch(err){
        return res.status(500).json({error: err, message: "Internal Server Error"});
    }

}

exports.getBooks = async (req, res) =>{
    try {
        //?get only those books which have isActive = true & quantity > 0 

        // const books = await Book.find({$and: [{isActive: true}, {quantity: {$gt: 0}}]})
        // .populate('author', 'name age')
        // .populate('bought_by', 'firstname lastname');

        //? get only active books
        const books = await Book.find({isActive: true})
        .populate('author', 'name age')
        .populate('bought_by', 'firstname lastname');


        // ? To hit multiple queries inside a loop
        // const updatedBooksWithAuthor = await Promise.all(
        //     books.map(async book =>{
        //         const author = await Author.find({_id: book.author});
        //         return {...book, author: author[0]}
        //     })
        // );
        // console.log(updatedBooksWithAuthor);

        if(!books){
            return res.status(400).json({message: "Error fetching books"});
        }
        if(books && books.length === 0){
            return res.status(400).json({message: "No books found"});
        }
        return res.status(200).json({booksData: books, message: "Books fetched Successfully!"});
    } catch (err) {
        return res.status(500).json({error: err.message, message: "Internal Server Error"});
    }
}


exports.getBookById = async (req, res) =>{
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        
        if(book){
            return res.status(200).json({bookData: book, message: "Book fetched successfully!"});
        }

        return res.status(400).json({message: "Book not found"});

    } catch (err) {
        return res.status(500).json({error: err, message: "Internal Server Error"});
    }
}

exports.deleteBookById = async (req, res) =>{
    try {
        const bookId = req.params.id;
        const bookDeleted = await Book.findByIdAndDelete(bookId);

        // console.log(bookDeleted);

        if(!bookDeleted){
            return res.status(400).json({message: "Error deleting Book / Invalid Id"});
        }
        return res.status(200).json({message: "Book deleted successfully!"});


    } catch (err) {
        return res.status(500).json({error: err, message: "Internal Server Error"});
    }
}

exports.updateBookById = async (req, res) =>{
    try {
        const bookId = req.params.id;
        const bookUpdated = await Book.findByIdAndUpdate(bookId, req.body);

        // console.log(bookUpdated);

        if(bookUpdated){
            return res.status(200).json({message: "Book updated successfully!"});
        }

        return res.status(400).json({message: "Error updating Book"});

    } catch (err) {
        return res.status(500).json({error: err, message: "Internal Server Error"});
    }
}

exports.deactivateBook = async (req, res)=>{
    try {
        const bookId = req.params.id;
        const bookUpdated = await Book.findByIdAndUpdate(bookId, {isActive: false});

        // console.log(bookUpdated);

        if(bookUpdated){
            return res.status(200).json({message: "Book deactivated successfully!"});
        }

        return res.status(400).json({message: "Error deactivating Book"});

    } catch (err) {
        return res.status(500).json({error: err, message: "Internal Server Error"});
    }
}
exports.updateBookQuantity = async (req, res)=>{
    try {
        const bookId = req.params.id;
        const bookUpdated = await Book.findByIdAndUpdate(bookId, {$inc: {quantity: -req.body.number}});

        // console.log(bookUpdated);

        if(bookUpdated){
            return res.status(200).json({message: "Book quantity updated successfully!"});
        }

        return res.status(400).json({message: "Error updating Book quantity"});

    } catch (err) {
        return res.status(500).json({error: err, message: "Internal Server Error"});
    }
}