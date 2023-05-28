import mongoose from "mongoose";

// Getting the current local date in JSON format
const localDate = new Date().toJSON().slice(0, 10);

// Creating the inventory schema
const inventorySchemas = new mongoose.Schema({
    ItemName: { type: String, required: true },
    Category: { type: String, required: true },
    ItemCode: { type: String, required: true },
    Description: { type: String, required: true },
    Unit: { type: String, required: true },
    StockQuantity: { type: String, required: true },
    AsOfDate: { type: Date, required: true },
    LowStockWarning: { type: Boolean, required: true, default: false },
    LowStockUnit: { type: String },
    PurchasePrice: { type: String, required: true },
    InclusiveOfTax: { type: Boolean, required: true, default: false },
    GST: { type: String, required: true },
    createdAt: { type: Date, default: localDate },
    updatedAt: { type: Date, default: localDate },
});

// Creating the inventory model based on the schema
const inventoryModel = mongoose.model("inventory", inventorySchemas);

// Exporting the inventory model
export default inventoryModel;
