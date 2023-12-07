import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import EditIcon from "@mui/icons-material/Edit";
import { green, red } from "@mui/material/colors";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";

const styleItem = {
  textAlign: "center",
  fontSize: 20,
  fontWeight: 500,
};

export const StInfoRow = ({
  id,
  studentId,
  setInitData,
  initData,
  index,
  lastName,
  firstName,
  sex,
  roomNumber,
  buildingName,
  mssv,
  socialDay,
}) => {
  const [open, setOpen] = useState(false);

  const defaultFormValues = {
    lastName: lastName,
    firstName: firstName,
    sex: sex,
    roomNumber: roomNumber,
    buildingName: buildingName,
    mssv: mssv,
    socialDay: socialDay,
  };
  const form = useForm({
    defaultValues: defaultFormValues,
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;
  const onSubmit = (data) => {
    delete data.mssv;
    axios
      .put(
        `http://localhost:8080/list?roomName=${data.roomNumber}-${data.buildingName}`,
        { ...data, id: studentId }
      )
      .then((response) => {
        let arr = initData;
        for (let i = 0; i < initData.length; i++) {
          if (arr[i].student.id === id) {
            arr[i] = {
              ...arr[i],
              student: {
                ...arr[i].student,
                ...data,
              },
              room: {
                ...arr[i].room,
                roomName: `${data.roomNumber}-${data.buildingName}`,
              },
            };
          }
        }

        console.log([...arr]);
        setInitData([...arr]);
      })
      .catch((error) => {
        console.error(error);
      });
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    await axios
      .delete(
        `http://localhost:8080/list?stdId=${studentId}&roomName=${roomNumber}-${buildingName}`
      )
      .then((response) => {
        console.log(`Student with ID ${studentId} deleted successfully`);
      })
      .catch((error) => {
        console.error(`Error deleting student with ID ${studentId}:`, error);
      });
    console.log(initData.filter((item) => item.studentId !== studentId));
    setInitData(initData.filter((item) => item.studentId !== studentId));
  };

  const handleCancel = () => {
    reset(defaultFormValues);
    handleClose();
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
        {index}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {mssv}
      </Grid>
      <Grid sx={styleItem} lg={2}>
        {lastName}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {firstName}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {sex}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {roomNumber}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {buildingName}
      </Grid>
      <Grid sx={styleItem} lg={1}>
        {socialDay}
      </Grid>

      <Grid sx={{ display: "flex", justifyContent: "space-evenly" }} lg={1}>
        <IconButton aria-label="edit">
          <EditIcon sx={{ color: green[500] }} onClick={handleOpen} />
          <Dialog
            open={open}
            noValidate
            onClose={handleClose}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DialogTitle>
              <Typography variant="h4">
                Chỉnh sửa thông tin sinh viên
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {[
                  {
                    label: "Họ và tên đệm",
                    gridSize: 7,
                    name: "lastName",
                    defaultValue: `${lastName}`,
                  },
                  {
                    label: "Tên",
                    gridSize: 5,
                    name: "firstName",
                    defaultValue: `${firstName}`,
                  },
                  {
                    label: "MSSV",
                    gridSize: 6,
                    name: "mssv",
                    defaultValue: `${mssv}`,
                  },
                  {
                    label: "Giới tính",
                    gridSize: 6,
                    name: "sex",
                    defaultValue: `${sex}`,
                  },
                  {
                    label: "Tòa",
                    gridSize: 4,
                    name: "buildingName",
                    defaultValue: `${buildingName}`,
                  },
                  {
                    label: "Phòng",
                    gridSize: 4,
                    name: "roomNumber",
                    defaultValue: `${roomNumber}`,
                  },
                  {
                    label: "Số ngày CTXH",
                    gridSize: 4,
                    name: "socialDay",
                    defaultValue: `${socialDay}`,
                  },
                ].map((item) => (
                  <Grid xs={item.gridSize}>
                    <TextField
                      required
                      disabled={!!(item.name === "mssv")}
                      autoFocus
                      {...register(`${item.name}`, {
                        required: `${item.label} is required`,
                      })}
                      error={!!errors[item.name]}
                      helperText={
                        errors && errors[item.name]
                          ? errors[item.name].message
                          : ""
                      }
                      margin="dense"
                      id="name"
                      label={item.label}
                      name={item.name}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type="submit">Áp dụng</Button>
            </DialogActions>
          </Dialog>
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon sx={{ color: red[900] }} />
        </IconButton>
      </Grid>
    </Grid>
  );
};
