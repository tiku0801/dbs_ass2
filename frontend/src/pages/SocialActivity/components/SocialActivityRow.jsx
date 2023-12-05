import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import EditIcon from "@mui/icons-material/Edit";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";

const styleItem = {
  textAlign: "center",
  fontSize: 20,
  fontWeight: 500,
};

export const SocialActivityRow = ({
  id,
  last_name,
  first_name,
  sex,
  room_number,
  building_name,
  student_id,
  ctxh,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  return (
    <Grid
      container
      columns={10}
      sx={{
        backgroundColor: "#E9F3F9",
        opacity: 0.82,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        color: "#023556",
        height: 60,
        marginTop: 1,
      }}
    >
      <Grid sx={styleItem} lg={1}>
        {id}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {student_id}
      </Grid>
      <Grid sx={styleItem} lg={2}>
        {last_name}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {first_name}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {sex}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {room_number}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {building_name}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {ctxh}
      </Grid>

      <Grid sx={{ display: "flex", justifyContent: "space-evenly" }} lg={1}>
        <IconButton aria-label="edit">
          <EditIcon sx={{ color: green[500] }} onClick={handleOpen} />
          {/* <Modal
            open={modal.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styleModal}>
              <Grid container spacing={2}>
                {[
                  { label: "Họ và tên đệm", gridSize: "6" },
                  { label: "Tên", gridSize: "3" },
                  { label: "MSSV", gridSize: "3" },
                  { label: "Giới tính", gridSize: "3" },
                  { label: "Tòa", gridSize: "3" },
                  { label: "Phòng", gridSize: "3" },
                  { label: "Số ngày CTXH", gridSize: "3" },
                ].map((item) => (
                  <Grid xs={item.gridSize}>
                    <TextField
                      id="outlined-basic"
                      label={item.label}
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
              <Button onClick={handleClose}>Close Child Modal</Button>
            </Box>
          </Modal> */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              <Typography variant="h4">
                Chỉnh sửa thông tin sinh viên
              </Typography>
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText>
                  To subscribe to this website, please enter your email address
                  here. We will send updates occasionally.
                </DialogContentText> */}
              <Grid container spacing={2}>
                {[
                  {
                    label: "Họ và tên đệm",
                    gridSize: 7,
                    type: "last_name",
                    defaultValue: `${last_name}`,
                  },
                  {
                    label: "Tên",
                    gridSize: 5,
                    type: "first_name",
                    defaultValue: `${first_name}`,
                  },
                  {
                    label: "MSSV",
                    gridSize: 6,
                    type: "student_id",
                    defaultValue: `${student_id}`,
                  },
                  {
                    label: "Giới tính",
                    gridSize: 6,
                    type: "sex",
                    defaultValue: `${sex}`,
                  },
                  {
                    label: "Tòa",
                    gridSize: 4,
                    type: "building_name",
                    defaultValue: `${building_name}`,
                  },
                  {
                    label: "Phòng",
                    gridSize: 4,
                    type: "room_number",
                    defaultValue: `${room_number}`,
                  },
                  {
                    label: "Số ngày CTXH",
                    gridSize: 4,
                    type: "ctxh",
                    defaultValue: `${ctxh}`,
                  },
                ].map((item) => (
                  <Grid xs={item.gridSize}>
                    <TextField
                      required
                      autoFocus
                      defaultValue={item.defaultValue}
                      margin="dense"
                      id="name"
                      label={item.label}
                      type={item.type}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button onClick={handleClose}>Áp dụng</Button>
            </DialogActions>
          </Dialog>
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon sx={{ color: red[900] }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
