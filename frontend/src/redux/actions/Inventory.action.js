import * as type from '../types';

// Action creator for adding a book to the inventory
export function addBookToInventory(formValues) {
    return {
        type: type.ADD_BOOK_TO_INVENTORY_REQUESTED,
        payload: formValues,
    }
}

// Action creator for getting all books from the inventory
export function getAllBooksFromInventory() {
    return {
        type: type.GET_ALL_BOOKS_FROM_INVENTORY_REQUESTED,
    }
}

// Action creator for deleting a book from the inventory
export function deleteBookFromInventory(selected) {
    return {
        type: type.DELETE_BOOK_FROM_INVENTORY_REQUESTED,
        payload: selected,
    }
}

// Action creator for updating a book in the inventory
export function updateBookFromInventory(formValues) {
    return {
        type: type.UPDATE_BOOK_FROM_INVENTORY_REQUESTED,
        payload: formValues,
    }
}

// Action creator for adjusting the stock of a book by ID
export function adjustStockById(id, formValues) {
    return {
        type: type.ADJUST_STOCK_REQUESTED,
        payload: { id, formValues },
    }
}