import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function AddStuDialog({ open, setOpen, fetchActInfoData, initData }) {
  const defaultFormValues = {
    lastName: "",
    firstName: "",
    sex: "",
    roomNumber: "",
    buildingName: "",
    mssv: "",
    socialDay: "",
  };

  const asyncValidate = async (value, name) => {
    // You should replace the URL and the backend validation logic
    const isDuplicate = initData.some((item) => item.mssv === value);
    if (isDuplicate) {
      return `${name} already exists`;
    }

    return true; // Value is unique
  };
  const onSubmit = (data) => {
    addDataOnServer(data);
  };

  const postData = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/list?roomName=${data.roomNumber}-${data.buildingName}`,
        { ...data }
      );
      fetchActInfoData();
      console.log(initData);
      return { mssv: response.data.mssv, maxStudent: response.data.maxStudent };
    } catch (error) {
      console.error(error);
    }
  };

  const addDataOnServer = async (data) => {
    const response = await postData(data);
    handleClose();
    reset(defaultFormValues);
  };
  const form = useForm({
    defaultValues: defaultFormValues,
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    reset(defaultFormValues);
    handleClose();
  };
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      mt={1}
      mb={1}
    >
      <Dialog
        open={open}
        noValidate
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <DialogTitle>
          <Typography variant="h4">Thêm sinh viên</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {[
              {
                label: "Họ và tên đệm",
                gridSize: 7,
                name: "lastName",
              },
              {
                label: "Tên",
                gridSize: 5,
                name: "firstName",
              },
              {
                label: "MSSV",
                gridSize: 6,
                name: "mssv",
              },
              {
                label: "Giới tính",
                gridSize: 6,
                name: "sex",
              },
              {
                label: "Tòa",
                gridSize: 4,
                name: "buildingName",
              },
              {
                label: "Phòng",
                gridSize: 4,
                name: "roomNumber",
              },
              {
                label: "Số ngày CTXH",
                gridSize: 4,
                name: "socialDay",
              },
            ].map((item) => (
              <Grid xs={item.gridSize}>
                <TextField
                  required
                  autoFocus
                  {...register(`${item.name}`, {
                    required: `${item.label} is required`,
                    validate: async (value) =>
                      await asyncValidate(value, "mssv"),
                  })}
                  error={!!errors[item.name]}
                  helperText={
                    errors && errors[item.name] ? errors[item.name].message : ""
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
    </Grid>
  );
}

export default AddStuDialog;
