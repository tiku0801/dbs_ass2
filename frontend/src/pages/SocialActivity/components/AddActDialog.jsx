import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

function AddActDialog({ open, setOpen, setInitData }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    reset(defaultFormValues);
    handleClose();
  };
  const defaultFormValues = {
    actName: "",
    numOfDay: "",
    startDate: "",
  };
  const addDataOnServer = async (data) => {
    try {
      const response = await axios.post(`http://localhost:8080/act`, {
        ...data,
      });
      setInitData((prev) => [...prev, response.data]);
      handleClose();
      reset(defaultFormValues);
    } catch (error) {
      console.error(error);
    }
  };
  const onSubmit = (data) => {
    addDataOnServer(data);
  };
  const form = useForm({
    defaultValues: defaultFormValues,
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  console.log(errors);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle>
        <Typography variant="h4">Thêm hoạt động ngoại khóa</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {[
            {
              label: "Tên hoạt động",
              gridSize: 12,
              name: "actName",
            },
            {
              label: "Số ngày CTXH",
              gridSize: 12,
              name: "numOfDay",
            },
            {
              label: "Ngày bắt đầu",
              gridSize: 12,
              name: "startDate",
            },
          ].map((item) => (
            <Grid xs={item.gridSize} mt={2}>
              <TextField
                required
                // autoFocus
                placeholder={item.name === "startDate" ? "YYYY-MM-DD" : ""}
                multiline={!!(item.name === "startDate")}
                {...register(`${item.name}`, {
                  required: `${item.label} is required`,
                })}
                error={!!errors[item.name]}
                helperText={
                  errors && errors[item.name] ? errors[item.name].message : ""
                }
                autoFocus
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
  );
}

export default AddActDialog;
