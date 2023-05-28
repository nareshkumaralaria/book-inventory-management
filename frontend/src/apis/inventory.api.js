import { base_url, httpService } from "./config";

// API function to add a book to the inventory
export const addBookToInventoryApi = async (formValues) => {
    const response = await httpService.post(`${base_url}/inventory/books/add`, { formValues });
    return response.data;
}

// API function to fetch all books from the inventory
export const getAllBooksFromInventoryApi = async () => {
    const response = await httpService.get(`${base_url}/inventory/books/all`);
    return response.data;
}

// API function to delete a book from the inventory
export const deleteBookFromInventoryApi = async (selected) => {
    const response = await httpService.post(`${base_url}/inventory/books/delete`, { selected });
    return response.data;
}

// API function to update a book in the inventory
export const updateBookFromInventoryApi = async (formValues) => {
    const response = await httpService.post(`${base_url}/inventory/books/update`, { formValues });
    return response.data;
}

// API function to adjust stock by book ID
export const AdjustStockByIdApi = async (data) => {
    const response = await httpService.post(`${base_url}/inventory/books/update/${data.id}`, { formValues: data.formValues });
    return response.data;
}