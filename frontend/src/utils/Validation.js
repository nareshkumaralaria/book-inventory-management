export const Validation = (formValues) => {
    const errors = {};
    let isValid = true;
    if (!formValues.ItemName) {
        errors.ItemName = "Item Name is required";
        isValid = false;
    }
    if (!formValues.Category) {
        errors.Category = "Category is required";
        isValid = false;
    }
    if (!formValues.ItemCode) {
        errors.ItemCode = "Item Code is required";
        isValid = false;
    }

    if (!formValues.Description) {
        errors.Description = "Description is required";
        isValid = false;
    }

    if (!formValues.Unit) {
        errors.Unit = "Unit is required";
        isValid = false;
    }
    if (!formValues.StockQuantity) {
        errors.StockQuantity = "Opening Stock is required";
        isValid = false;
    }
    if (!formValues.AsOfDate) {
        errors.AsOfDate = "Date is required";
        isValid = false;
    }
    if (formValues.LowStockWarning && !formValues.LowStockUnit) {
        errors.LowStockUnit = "Low Stock Unit is required";
        isValid = false;
    }
    if (!formValues.PurchasePrice) {
        errors.PurchasePrice = "Purchase Price is required";
        isValid = false;
    }
    if (!formValues.GST) {
        errors.GST = "GST is required";
        isValid = false;
    }

    return { errors, isValid };
}