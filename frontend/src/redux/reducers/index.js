import { combineReducers } from 'redux';
import { addBookToInventoryReducer, getAllBooksFromInventoryReducer, deleteBookFromInventoryReducer, updateBookFromInventoryReducer, adjustStockByIdReducer } from './Inventory.reducer.js'

//defining root reducer
const rootReducer = combineReducers({
    addBookToInventoryReducer, getAllBooksFromInventoryReducer, deleteBookFromInventoryReducer, updateBookFromInventoryReducer, adjustStockByIdReducer
})

export default rootReducer;