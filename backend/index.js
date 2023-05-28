import './connection/database.js'
import router from './connection/app.js';

// Importing the controller functions
import { addBookToInventory, getAllBooksFromInventory, deleteBookFromInventory, updateBookFromInventory, adjustStockById } from './controllers/index.js';

// Route for adding a book to the inventory
router.post('/inventory/books/add', addBookToInventory)

// Route for getting all books from the inventory
router.get('/inventory/books/all', getAllBooksFromInventory)

// Route for deleting a book from the inventory
router.post('/inventory/books/delete', deleteBookFromInventory)

// Route for updating a book in the inventory
router.post('/inventory/books/update', updateBookFromInventory)

// Route for adjusting the stock of a book in the inventory by ID
router.post('/inventory/books/update/:id', adjustStockById)