const Author = require('../model/Author');

exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.findOne({ name: req.body.name });
        if (author) {
            return res.status(400).json({ message: "Author already exist" });
        }

        const authorCreated = await Author.create(req.body);
        if (!authorCreated) {
            return res.status(400).json({ message: "Error creating author" });
        }
        return res.status(200).json({ message: "Author created successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// read

exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().populate('books_published', 'name description price');
        if (!authors) {
            return res.status(400).json({ message: "Error fetching authors" });
        }

        if (authors && authors.length === 0) {
            return res.status(400).json({ message: "No books found" });
        }

        return res.status(200).json({ authorsData: authors, message: 'Authors fetched Successfully' });
    } catch (err) {
        return res.status(500).json({ error: err, message: 'Internal server error' });
    }
}

// update

exports.updateAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const authorToBeUpdated = await Author.findOneAndUpdate(authorId, req.body);
        if (!authorToBeUpdated) {
            return res.status(400).json({ message: 'Error updating author / Invalid Id' });
        }
        return res.status(200).json({ message: 'Author updated successfully!' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

//delete
exports.deleteAuthor = async (req, res) => {
    try {
        const authorId = req.params.id;
        const authorToBeDeleted = await Author.findByIdAndDelete(authorId);
        if (!authorToBeDeleted) {
            return res.status(400).json({ message: 'Error deleting author / Invalid Id' });
        }

        return res.status(200).json({ message: 'Author deleted successfully!' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}


//get author by id
exports.getAuthorById = async (req, res) => {
    try {
        const authorId = req.params.id;
        const author = await Author.findById(authorId);
        if (!author) {
            return res.status(400).json({ message: 'Author not found author / Invalid Id' });
        }
        return res.status(200).json({ authorData: author, message: 'Author fetched successfully' });
    } catch (err) {
        return res.status(200).json({ message: 'Internal server error' });
    }
}