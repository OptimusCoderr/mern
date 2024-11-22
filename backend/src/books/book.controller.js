const Book = require('./book.model');


//POST A BOOK
const postABook = async (req, res) => {
    try{
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: 'Book posted successfully', book: newBook});
    }
    catch(error) {
        console.error("Error creating book: ", error);
        res.status(500).send({message: 'Failed to create book'});

    }  
};


//GET ALL BOOKS
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt:-1});
        res.status(200).send(books);
    } catch (error) {
        console.error("Error fetching book: ", error);
        res.status(500).send({message: 'Failed to fetch book'});
    }
};


const getSingleBook =  async(req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        res.status(200).send(book);
        if (!book) {
            res.status(404).send({message: 'Book not found'});
        }
    } catch (error) {
        console.error("Error fetching a book: ", error);
        res.status(500).send({message: 'Failed to fetch book'});
    }
};

const updateBook = async(req,res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedBook){
            res.status(404).send({message: 'Book not found'});
        }
        res.status(200).send({
            message: 'Book updated successfully',
            book: updatedBook,
        });

        
    } catch (error) {
        console.error("Error updating a book: ", error);
        res.status(500).send({message: 'Failed to update a book'});
        
    }
};


const deleteABook = async (req, res) => {
    try {
        const {id} = req.params
        const deletedBook = await Book.findByIdAndDelete(id);
        if(!deletedBook){
            res.status(404).send({message: "Book is not found"})
        }
        res.status(200).send({
            message: 'Book deleted successfully',
            book: deletedBook,
        });
    } catch (error) {
        console.error("Error deleting a book: ", error);
        res.status(500).send({message: 'Failed to delete a book'});
    }
};


module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteABook,
}