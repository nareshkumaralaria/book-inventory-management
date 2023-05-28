import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Header, Options, Tables } from './components/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooksFromInventory } from './redux/actions/Inventory.action.js';
import { Box, Skeleton } from '@mui/material';

function App() {

  const dispatch = useDispatch()

  const [selected, setSelected] = useState([]);
  const [showLowStock, setShowLowStock] = useState(false);

  // Retrieve data from the Redux store
  const inventoryData = useSelector(state => state.getAllBooksFromInventoryReducer);
  const addInventoryData = useSelector(state => state.addBookToInventoryReducer)
  const updateInventoryData = useSelector(state => state.updateBookFromInventoryReducer)
  const deleteInventoryData = useSelector(state => state.deleteBookFromInventoryReducer)
  const adjustStockData = useSelector(state => state.adjustStockByIdReducer)

  // Fetch all books from inventory when the component mounts or when certain data changes
  useEffect(() => {
    dispatch(getAllBooksFromInventory());
  }, [addInventoryData.data, updateInventoryData.data, deleteInventoryData.data, adjustStockData.data])

  return (
    <>
      <Toaster /> {/* Notification component */}
      <Header />
      <Options showLowStock={showLowStock} setShowLowStock={setShowLowStock} selected={selected} setSelected={setSelected} />
      {
        inventoryData.loading ? ( // Display skeleton loader while loading data
          <>
            <Box style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <Skeleton variant="rounded" width='100%' height={20} ></Skeleton>
              <Skeleton variant="rounded" width='100%' height={30} ></Skeleton>
              <Skeleton variant="rounded" width='100%' height={40} ></Skeleton>
              <Skeleton variant="rounded" width='100%' height={50} ></Skeleton>
              <Skeleton variant="rounded" width='100%' height={60} ></Skeleton>
            </Box>
          </>
        )
          : ( // Render the table component with filtered data if showLowStock is true, else render all data
            <Tables selected={selected} setSelected={setSelected} inventoryData={
              showLowStock
                ? inventoryData.data.filter(
                  (data) => Number(data.StockQuantity) <= Number(data.LowStockUnit)
                )
                : inventoryData.data
            } />
          )
      }
    </>
  )
}

export default App
