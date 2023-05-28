// Importing mongoose for ObjectId conversion and inventory model
import mongoose from 'mongoose';
import inventoryModel from '../models/inventory.model.js';

// Controller for adding a book to the inventory
export const addBookToInventory = async (req, res) => {
    try {
        const { formValues } = req.body;
        const dataInstance = new inventoryModel(formValues);

        await dataInstance.save();

        res.status(200).json({
            data: dataInstance,
            success: true,
            message: "Item created successfully"
        });
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            error: err.message || "Internal Server Error",
        });
    }
}

// Controller for getting all books from the inventory
export const getAllBooksFromInventory = async (req, res) => {
    try {
        const allBooks = await inventoryModel.find({});

        res.status(200).json({
            data: allBooks,
            success: true,
            message: "All books are loaded"
        });
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            error: err.message || "Internal Server Error",
        });
    }
}

// Controller for deleting a book from the inventory
export const deleteBookFromInventory = async (req, res) => {
    try {
        const { selected } = req.body;

        // Convert the array of string IDs to ObjectId format
        const selectedIds = selected.map((id) => new mongoose.Types.ObjectId(id));
        const dataInstance = await inventoryModel.deleteMany({ _id: { $in: selectedIds } });

        res.status(200).json({
            data: dataInstance,
            success: true,
            message: "Book deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({
            success: false,
            error: err.message || "Internal Server Error",
        });
    }
}

// Controller for updating a book in the inventory
export const updateBookFromInventory = async (req, res) => {
    try {
        const { formValues } = req.body;
        const dataInstance = await inventoryModel.findById(formValues._id)

        // Update the fields of the book
        dataInstance.ItemName = formValues.ItemName
        dataInstance.Category = formValues.Category
        dataInstance.ItemCode = formValues.ItemCode
        dataInstance.Description = formValues.Description
        dataInstance.Unit = formValues.Unit
        dataInstance.StockQuantity = formValues.StockQuantity
        dataInstance.AsOfDate = formValues.AsOfDate
        dataInstance.LowStockWarning = formValues.LowStockWarning
        dataInstance.LowStockUnit = formValues.LowStockUnit
        dataInstance.PurchasePrice = formValues.PurchasePrice
        dataInstance.InclusiveOfTax = formValues.InclusiveOfTax
        dataInstance.GST = formValues.GST
        dataInstance.updatedAt = new Date().toJSON().slice(0, 10)

        await dataInstance.save();

        res.status(200).json({
            data: dataInstance,
            success: true,
            message: "Book Updated successfully"
        });
    } catch (err) {
        console.log("err :", err)
        res.status(err.status || 500).json({
            success: false,
            error: err.message || "Internal Server Error",
        });
    }
}

// Controller for adjusting the stock quantity of a book by its ID
export const adjustStockById = async (req, res) => {
    try {
        const { formValues } = req.body;
        const { id } = req.params;
        const dataInstance = await inventoryModel.findById(id)

        let finalStock;
        if (formValues.type === 'add') {
            finalStock = Number(dataInstance.StockQuantity) + Number(formValues.adjustStockQuantity)
        } else {
            finalStock = Number(dataInstance.StockQuantity) - Number(formValues.adjustStockQuantity)
        }

        // Update the stock quantity of the book
        dataInstance.StockQuantity = finalStock;

        await dataInstance.save();

        res.status(200).json({
            data: dataInstance,
            success: true,
            message: "Book Stock Updated successfully"
        });
    } catch (err) {
        console.log("err :", err)
        res.status(err.status || 500).json({
            success: false,
            error: err.message || "Internal Server Error",
        });
    }
}