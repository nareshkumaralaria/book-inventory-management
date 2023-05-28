import React, { useState } from 'react'
import { Box, Button, Container } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { HelperModalAdd } from './index.js'
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { deleteBookFromInventory } from '../redux/actions/Inventory.action.js';

const Options = ({ showLowStock, setShowLowStock, selected, setSelected }) => {

    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        dispatch(deleteBookFromInventory(selected))
        setSelected([]);
    };

    return (
        <>
            <Container component='div' maxWidth="xl" sx={{ margin: "6px 0" }}>
                <Box sx={{ bgcolor: '#fff', minHeight: '64px', display: 'flex', alignItems: 'center', justifyContent: "flex-end", gap: "24px", flexWrap: "wrap" }}>
                    {/* Button to toggle showLowStock state */}
                    <Button
                        color='primary'
                        variant={showLowStock ? 'outlined' : 'text'}
                        onClick={() => setShowLowStock((prevState) => !prevState)}
                    >
                        Show Low Stock &nbsp;
                        {showLowStock && <CloseIcon fontSize='small' />}
                    </Button>
                    {/* Button to delete selected items */}
                    <Button
                        variant='outlined'
                        disabled={selected.length > 0 ? false : true}
                        color={selected.length > 0 ? 'error' : 'primary'}
                        onClick={handleDelete}
                    >
                        <DeleteIcon />&nbsp;Delete Selected
                    </Button>
                    {/* Button to open the add books to inventory modal */}
                    <Button
                        onClick={handleClickOpen}
                        variant='contained'
                        color='primary'>
                        <AddIcon />&nbsp;Add To Inventory
                    </Button>

                    {/* Helper Modal for adding items to inventory */}
                    <HelperModalAdd
                        open={open}
                        handleClose={handleClose} />
                </Box>
            </Container>
        </>
    )
}

export default Options