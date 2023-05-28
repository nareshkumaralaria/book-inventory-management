import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import WarningIcon from '@mui/icons-material/Warning';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import { HelperModalAdjust, HelperModalEdit } from './index.js';

const Tables = ({ selected, setSelected, inventoryData }) => {

  const [editData, setEditData] = useState({});
  const [open, setOpen] = useState(false);
  const [openAdjust, setOpenAdjust] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAdjust = () => {
    setOpenAdjust(false);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const allSelect = inventoryData.map((d) => d._id);
      setSelected(allSelect);
      return;
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  console.log("inventoryData :", inventoryData);

  return (
    <>
      {
        inventoryData?.length > 0 ?
          <div style={{ maxHeight: 500, height: "fit-content", width: '100%', padding: "0 24px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onChange={handleSelectAllClick}
                        checked={selected.length === inventoryData.length}
                      />{" "}
                    </TableCell>
                    <TableCell>Item Name</TableCell>
                    <TableCell align="center">Item Code</TableCell>
                    <TableCell align="center">Category</TableCell>
                    <TableCell align="center">Stock Quantity</TableCell>
                    <TableCell align="center">Stock On Hold</TableCell>
                    <TableCell align="center">Stock Value</TableCell>
                    <TableCell align="center">Purchase Price</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    inventoryData?.map((row) => (
                      <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                        <TableCell className="selectCheckbox" padding="checkbox">
                          <Checkbox
                            color="primary"
                            onClick={(event) => handleCheckboxClick(event, row._id)}
                            checked={isSelected(row._id)}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">{row.ItemName}</TableCell>
                        <TableCell align="center">{row.ItemCode}</TableCell>
                        <TableCell align="center">{row.Category}</TableCell>
                        <TableCell align="center">{row.StockQuantity} {row.Unit}</TableCell>
                        <TableCell align="center">0 {row.Unit}</TableCell>
                        <TableCell align="center">&#8377; {row.StockQuantity * row.PurchasePrice}</TableCell>
                        <TableCell align="center">&#8377; {row.PurchasePrice}</TableCell>
                        <TableCell align="center">
                          {parseInt(row.StockQuantity) <= parseInt(row.LowStockUnit) && (
                            <WarningIcon color='error' />
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <EditIcon
                            onClick={() => {
                              setEditData(row);
                              setOpen(true);
                            }}
                            color="disabled"
                            style={{ cursor: "pointer" }}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setEditData(row);
                              setOpenAdjust(true);
                            }}
                          >
                            Adjust Stock
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))

                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          : <div style={{ height: "fit-content", width: '100%', textAlign: "center", padding: "60px 24px" }}>No Data Available</div>
      }
      <HelperModalEdit open={open} handleClose={handleClose} editData={editData} />
      <HelperModalAdjust open={openAdjust} handleClose={handleCloseAdjust} editData={editData} />

    </>
  );
}

export default Tables