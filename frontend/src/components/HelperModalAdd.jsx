import React, { useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, InputAdornment, MenuItem, Switch, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Validation } from '../utils/Validation.js';
import { useDispatch } from 'react-redux';
import { addBookToInventory } from '../redux/actions/Inventory.action.js'

const HelperModalAdd = ({ open, handleClose }) => {

    // State for storing selected files
    const [files, setFiles] = useState([]);

    // Function to handle file changes
    const updateFiles = (incommingFiles) => {
        //do something with the files
        setFiles(incommingFiles);
        //even your own upload implementation
    };

    // Function to remove a file from the selected files
    const removeFile = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };

    // Initial form values
    const initialFormValues = {
        ItemName: "", Category: "", ItemCode: "", Description: "", Unit: "", StockQuantity: "", AsOfDate: new Date().toJSON().slice(0, 10), LowStockWarning: false,
        LowStockUnit: "", PurchasePrice: "", InclusiveOfTax: false, GST: ""
    }

    // Redux dispatch
    const dispatch = useDispatch();

    // State for form values and errors
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formError, setFormError] = useState({});

    // Handle form value changes
    const handleFormValues = (event) => {
        const { name, value } = event.target;
        if (name === "LowStockWarning") {
            setFormValues({ ...formValues, LowStockWarning: !formValues.LowStockWarning, LowStockUnit: !formValues.LowStockWarning ? "" : formValues.LowStockUnit })
        } else if (name === "InclusiveOfTax") {
            setFormValues({ ...formValues, InclusiveOfTax: !formValues.InclusiveOfTax })
        } else {
            setFormValues({ ...formValues, [name]: value })
        }
    }

    // Handle form submission
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const { errors, isValid } = Validation(formValues);
        setFormError(errors);

        if (isValid) {
            dispatch(addBookToInventory(formValues));
            handleClose();
        }
    }

    return (
        <>
            <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="lg">
                <DialogTitle sx={{ m: 0, }} variant='body1' >
                    <b>CREATE ITEM</b>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8, }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <form >
                    <Grid container spacing={2}>
                        <Grid item sm={12} md={6}>
                            <DialogContent sx={{ borderRight: "1px solid rgba(0,0,0,0.2)" }}>
                                <Divider />
                                <Typography variant='body1' sx={{ m: 1 }} ><b>General Details</b></Typography>
                                <Divider />

                                <Typography variant='body1' sx={{ marginTop: 2 }}>
                                    Upload Item Images
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', width: "100%", minHeight: 220, maxHeight: "fit-content" }}>
                                    <Dropzone
                                        onChange={updateFiles}
                                        value={files}
                                        footer={false}
                                        maxFiles={5}
                                        minHeight="100%"
                                        accept="image/*"
                                        background="#F2F2F2"
                                        style={{ borderRadius: 0, fontSize: "20px" }}
                                        label='Drag and Drop or Click to upload upto 5 images'
                                    >
                                        {files.map((file) => (
                                            <FileMosaic key={file.id} {...file} preview onDelete={removeFile} />
                                        ))}
                                    </Dropzone>
                                </Box>
                                <Box sx={{ width: "100%", mt: 2, display: "flex", flexDirection: "column", gap: '16px' }}>
                                    <TextField
                                        size="small"
                                        type='text'
                                        label="Item Name"
                                        variant="outlined"
                                        fullWidth
                                        name='ItemName'
                                        onChange={handleFormValues}
                                        error={!formError.ItemName ? false : true}
                                        helperText={!formError.ItemName ? null : formError.ItemName}
                                    />
                                    <Box sx={{ display: 'flex', gap: "12px", alignItems: "center" }}>
                                        <TextField
                                            size="small"
                                            type='text'
                                            select
                                            label="Category"
                                            variant="outlined"
                                            fullWidth
                                            name='Category'
                                            defaultValue={formValues.Category}
                                            value={formValues.Category}
                                            onChange={handleFormValues}
                                            error={!formError.Category ? false : true}
                                            helperText={!formError.Category ? null : formError.Category}
                                        >
                                            <MenuItem value="" style={{ fontStyle: "italic" }}>None</MenuItem>
                                            <MenuItem value="Panel">Panel</MenuItem>
                                            <MenuItem value="Inverter">Inverter</MenuItem>
                                            <MenuItem value="Wire">Wire</MenuItem>
                                            <MenuItem value="MC4 Connector">MC4 Connector</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </TextField>
                                        <AddIcon sx={{ cursor: "pointer" }} />
                                    </Box>
                                    <TextField
                                        size="small"
                                        type='text'
                                        label="Item Code"
                                        variant="outlined"
                                        fullWidth
                                        name='ItemCode'
                                        onChange={handleFormValues}
                                        error={!formError.ItemCode ? false : true}
                                        helperText={!formError.ItemCode ? null : formError.ItemCode}
                                    />
                                    <TextField
                                        size="small"
                                        label="Item Description"
                                        multiline
                                        maxRows={4}
                                        name='Description'
                                        onChange={handleFormValues}
                                        error={!formError.Description ? false : true}
                                        helperText={!formError.Description ? null : formError.Description}
                                    />
                                </Box>
                            </DialogContent>
                        </Grid>

                        <Grid item sm={12} md={6} paddingLeft="0 !important">
                            <DialogContent>
                                <Divider />
                                <Typography variant='body1' sx={{ m: 1 }} ><b>Stock Details</b></Typography>
                                <Divider />

                                <Grid container spacing={2} mt={1}>
                                    <Grid item sm={12} md={6} >
                                        <TextField
                                            size="small"
                                            type='text'
                                            select
                                            label="Unit"
                                            variant="outlined"
                                            fullWidth
                                            name='Unit'
                                            onChange={handleFormValues}
                                            defaultValue={formValues.Unit}
                                            value={formValues.Unit}
                                            error={!formError.Unit ? false : true}
                                            helperText={!formError.Unit ? null : formError.Unit}
                                        >
                                            <MenuItem value="" style={{ fontStyle: "italic" }}>None</MenuItem>
                                            <MenuItem value="FT">FEET(FT)</MenuItem>
                                            <MenuItem value="IN">INCHES(IN)</MenuItem>
                                            <MenuItem value="UNT">UNITS(UNT)</MenuItem>
                                            <MenuItem value="PCS">PIECES(PCS)</MenuItem>
                                            <MenuItem value="NOS">NUMBERS(NOS)</MenuItem>
                                            <MenuItem value="MM">MILLIMETERS(MM)</MenuItem>
                                            <MenuItem value="CMS">CENTIMETERS(CMS)</MenuItem>
                                            <MenuItem value="MTR">METERS(MTR)</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item sm={12} md={6} >
                                        <TextField
                                            size="small"
                                            type='number'
                                            label="Opening Stock"
                                            variant="outlined"
                                            fullWidth
                                            name='StockQuantity'
                                            onChange={handleFormValues}
                                            InputProps={{
                                                endAdornment: (<InputAdornment position="end">{formValues.Unit}</InputAdornment>),
                                            }}
                                            error={!formError.StockQuantity ? false : true}
                                            helperText={!formError.StockQuantity ? null : formError.StockQuantity}
                                        />
                                    </Grid>
                                    <Grid item sm={12} md={6}>
                                        <TextField
                                            size="small"
                                            type='date'
                                            defaultValue={formValues.AsOfDate}
                                            label="As of Date"
                                            variant="outlined"
                                            fullWidth
                                            name='AsOfDate'
                                            onChange={handleFormValues}
                                            error={!formError.AsOfDate ? false : true}
                                            helperText={!formError.AsOfDate ? null : formError.AsOfDate}
                                        />
                                    </Grid>
                                    <Grid item sm={12} display="flex" gap="20px">
                                        <FormControlLabel
                                            style={{ marginLeft: "0" }}
                                            control={
                                                <Switch
                                                    name='LowStockWarning'
                                                    onChange={handleFormValues}
                                                />
                                            }
                                            label="Enable Low Stock Warning"
                                            labelPlacement="start"
                                        />
                                        {
                                            formValues.LowStockWarning
                                                ? <TextField
                                                    size="small"
                                                    type='number'
                                                    label="Low Stock Units"
                                                    variant="outlined"
                                                    name='LowStockUnit'
                                                    onChange={handleFormValues}
                                                    error={!formError.LowStockUnit && formValues.LowStockWarning ? false : true}
                                                    helperText={!formError.LowStockUnit && formValues.LowStockWarning ? null : formError.LowStockUnit}
                                                    InputProps={{
                                                        endAdornment: (<InputAdornment position="end">{formValues.Unit}</InputAdornment>),
                                                    }}
                                                />
                                                : null
                                        }

                                    </Grid>
                                </Grid>

                                <Divider sx={{ mt: 2 }} />
                                <Typography variant='body1' sx={{ m: 1 }} ><b>Pricing Details</b></Typography>
                                <Divider />

                                <Grid container spacing={2} mt={1}>
                                    <Grid item sm={12} md={6} >
                                        <TextField
                                            size="small"
                                            type='number'
                                            label="Purchase Price"
                                            variant="outlined"
                                            fullWidth
                                            name='PurchasePrice'
                                            onChange={handleFormValues}
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start">&#8377;</InputAdornment>),
                                            }}
                                            error={!formError.PurchasePrice ? false : true}
                                            helperText={!formError.PurchasePrice ? null : formError.PurchasePrice}
                                        />
                                    </Grid>
                                    <Grid item sm={12} md={6} >
                                        <FormControlLabel
                                            style={{ marginLeft: "0" }}
                                            control={
                                                <Switch
                                                    name='InclusiveOfTax'
                                                    onChange={handleFormValues}
                                                />
                                            }
                                            label="Inclusive of tax"
                                            labelPlacement="start"
                                        />
                                    </Grid>
                                    <Grid item sm={12} md={6} >
                                        <TextField
                                            size="small"
                                            type='text'
                                            select
                                            label="GST Tax Rate (%)"
                                            variant="outlined"
                                            fullWidth
                                            name='GST'
                                            onChange={handleFormValues}
                                            defaultValue={formValues.GST}
                                            value={formValues.GST}
                                            error={!formError.GST ? false : true}
                                            helperText={!formError.GST ? null : formError.GST}
                                        >
                                            <MenuItem value="" style={{ fontStyle: "italic" }}>None</MenuItem>
                                            <MenuItem value="0">GST @ 0%</MenuItem>
                                            <MenuItem value="0.1">GST @ 0.1%</MenuItem>
                                            <MenuItem value="0.25">GST @ 0.25%</MenuItem>
                                            <MenuItem value="3">GST @ 3%</MenuItem>
                                            <MenuItem value="5">GST @ 5%</MenuItem>
                                            <MenuItem value="12">GST @ 12%</MenuItem>
                                            <MenuItem value="18">GST @ 18%</MenuItem>
                                            <MenuItem value="28">GST @ 28%</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>

                            </DialogContent>
                        </Grid>
                    </Grid>
                    <Divider />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' type='submit' sx={{ m: 1 }} onClick={handleFormSubmit}>Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default HelperModalAdd