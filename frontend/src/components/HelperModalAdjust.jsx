import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { adjustStockById } from '../redux/actions/Inventory.action.js';
import { useDispatch } from 'react-redux';


const HelperModalAdjust = ({ open, handleClose, editData }) => {

    // Redux dispatch
    const dispatch = useDispatch();

    // State for form values and adjust stock
    const [formValues, setFormValues] = useState(editData);
    const [adjustStock, setAdjustStock] = useState({
        type: 'add',
        adjustStockQuantity: 0,
        remark: ''
    })

    // Handle adjust state value changes
    const handleAdjustStock = (event) => {
        const { name, value } = event.target;
        setAdjustStock({ ...adjustStock, [name]: value })
    }

    // Handle form submission
    const handleFormSubmit = () => {
        dispatch(adjustStockById(formValues._id, adjustStock));
        handleClose();
    }

    useEffect(() => {
        setFormValues(editData)
    }, [open])

    return (
        <>
            <Dialog onClose={handleClose} open={open} maxWidth="xs">
                <DialogTitle sx={{ m: 0, }} variant='body1' >
                    <b>Adjust Stock Quantity</b>
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
                        <Grid item sm={12} paddingLeft="0 ">
                            <DialogContent>
                                <Typography variant='body1' sx={{ mb: 1 }} ><b>Item Name : </b>{formValues.ItemName}</Typography>
                                <Typography variant='body1' sx={{ mb: 3 }} ><b>Current Stock : </b>{formValues.StockQuantity}</Typography>
                                <FormControl sx={{ mb: 2 }}>
                                    <FormLabel component='legend' id="demo-row-radio-buttons-group-label">Add or Reduce Stock</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="type"
                                        value={adjustStock.type}
                                        onChange={handleAdjustStock}
                                    >
                                        <FormGroup row>
                                            <FormControlLabel value="add" control={<Radio />} label="Add (+)" />
                                            <FormControlLabel value="reduce" control={<Radio />} label="Reduce (-)" />
                                        </FormGroup>
                                    </RadioGroup>
                                </FormControl>
                                <TextField
                                    size="small"
                                    type='number'
                                    label="Adjust Stock"
                                    variant="outlined"
                                    fullWidth
                                    name='adjustStockQuantity'
                                    onChange={handleAdjustStock}
                                    value={adjustStock.adjustStockQuantity}
                                    InputProps={{
                                        endAdornment: (<InputAdornment position="end">{formValues.Unit}</InputAdornment>),
                                        inputProps: { min: 0 }
                                    }}
                                />
                                <Typography variant='body1' sx={{ mt: 3 }} >
                                    <b>Final Stock : </b>
                                    {adjustStock.type === 'add'
                                        ? Number(formValues.StockQuantity) + Number(adjustStock.adjustStockQuantity)
                                        : Number(formValues.StockQuantity) - Number(adjustStock.adjustStockQuantity)}
                                </Typography>
                                <TextField
                                    sx={{ mt: 3 }}
                                    size="small"
                                    type='text'
                                    label="Remark (Optional)"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    maxRows={4}
                                    name='remark'
                                    onChange={handleAdjustStock}
                                    value={adjustStock.remark}
                                />
                            </DialogContent>
                        </Grid>
                    </Grid>
                    <Divider />
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' sx={{ m: 1 }} onClick={handleFormSubmit}>Save</Button>
                    </DialogActions>
                </form>
            </Dialog >
        </>
    )
}

export default HelperModalAdjust