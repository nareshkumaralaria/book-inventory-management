import { call, put, takeEvery } from 'redux-saga/effects';
import * as type from '../redux/types.js'

import { addBookToInventoryApi, getAllBooksFromInventoryApi, deleteBookFromInventoryApi, updateBookFromInventoryApi, AdjustStockByIdApi } from "../apis/inventory.api.js";
import { toast } from 'react-hot-toast';

// add book to inventory sagas
function* addBookToInventory(action) {
    try {
        const response = yield call(addBookToInventoryApi, action.payload);

        yield put({ type: type.ADD_BOOK_TO_INVENTORY_SUCCESS, payload: response });

        toast.success(response.message)

    } catch (error) {
        yield put({ type: type.ADD_BOOK_TO_INVENTORY_FAILED });

        toast.error(response.error)
    }
}

export function* addBookToInventorySaga() {
    yield takeEvery(type.ADD_BOOK_TO_INVENTORY_REQUESTED, addBookToInventory);
}

// get all books from inventory sagas
function* getAllBooksFromInventory() {
    try {
        const response = yield call(getAllBooksFromInventoryApi);

        yield put({ type: type.GET_ALL_BOOKS_FROM_INVENTORY_SUCCESS, payload: response });

    } catch (error) {
        yield put({ type: type.GET_ALL_BOOKS_FROM_INVENTORY_FAILED });

        toast.error(response.error)
    }
}

export function* getAllBooksFromInventorySaga() {
    yield takeEvery(type.GET_ALL_BOOKS_FROM_INVENTORY_REQUESTED, getAllBooksFromInventory);
}

// delete book from inventory sagas
function* deleteBookFromInventory(action) {
    try {
        const response = yield call(deleteBookFromInventoryApi, action.payload);

        yield put({ type: type.DELETE_BOOK_FROM_INVENTORY_SUCCESS, payload: response });

        toast.success(response.message)

    } catch (error) {
        console.log("saga :", error);
        toast.error(error.message)
        yield put({ type: type.DELETE_BOOK_FROM_INVENTORY_FAILED });
    }
}

export function* deleteBookFromInventorySaga() {
    yield takeEvery(type.DELETE_BOOK_FROM_INVENTORY_REQUESTED, deleteBookFromInventory);
}

// Update book from inventory sagas
function* updateBookFromInventory(action) {
    try {
        const response = yield call(updateBookFromInventoryApi, action.payload);

        yield put({ type: type.UPDATE_BOOK_FROM_INVENTORY_SUCCESS, payload: response });

        toast.success(response.message)

    } catch (error) {
        console.log("saga :", error);
        toast.error(error.message)
        yield put({ type: type.UPDATE_BOOK_FROM_INVENTORY_FAILED });
    }
}

export function* updateBookFromInventorySaga() {
    yield takeEvery(type.UPDATE_BOOK_FROM_INVENTORY_REQUESTED, updateBookFromInventory);
}

// Adjust Stock sagas
function* AdjustStockById(action) {
    try {
        const response = yield call(AdjustStockByIdApi, action.payload);

        yield put({ type: type.ADJUST_STOCK_SUCCESS, payload: response });

        toast.success(response.message)

    } catch (error) {
        console.log("saga :", error);
        toast.error(error.message)
        yield put({ type: type.ADJUST_STOCK_FAILED });
    }
}

export function* AdjustStockByIdSaga() {
    yield takeEvery(type.ADJUST_STOCK_REQUESTED, AdjustStockById);
}