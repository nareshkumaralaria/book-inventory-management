import { all } from 'redux-saga/effects';
import { addBookToInventorySaga, getAllBooksFromInventorySaga, deleteBookFromInventorySaga, updateBookFromInventorySaga, AdjustStockByIdSaga } from './Inventory.saga.js'

export default function* rootSaga() {
    yield all([
        addBookToInventorySaga(), getAllBooksFromInventorySaga(), deleteBookFromInventorySaga(), updateBookFromInventorySaga(), AdjustStockByIdSaga(),
    ])
}