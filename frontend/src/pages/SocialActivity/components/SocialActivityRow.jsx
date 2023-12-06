import DeleteIcon from "@mui/icons-material/Delete";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircleOutlined";
import { blue, green, red } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const styleItem = {
  textAlign: "center",
  fontSize: 20,
  fontWeight: 500,
};
const colHeader = {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 25,
  color: "#023556",
};

export const SocialActivityRow = ({
  index,
  id,
  actName,
  numOfDay,
  startDate,
  initData,
  setInitData,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [ACT_INFO_DATA, setACT_INFO_DATA] = useState([]);

  const fetchActInfoData = () => {
    axios
      .get(`http://localhost:8080/act/info?actId=${id}`)
      .then((response) => {
        console.log(response.data);
        setACT_INFO_DATA(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchActInfoData();
  }, [expanded]);

  const [openAdd, setOpenAdd] = useState(false);
  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const form = useForm({
    defaultValues: {
      stdId: "",
      actName: actName,
    },
  });

  const onSubmitAdd = (data) => {
    axios
      .patch(`http://localhost:8080/act?stdId=${data.stdId}&actId=${id}`)
      .then((response) => {
        console.log(response.data);
        // setACT_INFO_DATA(ACT_INFO_DATA.push({}));
        fetchActInfoData();
      })
      .catch((error) => {
        console.error(error);
      });
    handleCloseAdd();
    console.log(data);
  };

  const asyncValidate = async (value, name) => {
    // You should replace the URL and the backend validation logic
    const isDuplicate = ACT_INFO_DATA.some((item) => item.student.id == value);

    if (isDuplicate) {
      return `Sinh vien already exists`;
    }
    return true; // Value is unique
  };
  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const handleOpenAdd = (e) => {
    console.log(1);
    setOpenAdd(true);
    e.stopPropagation();
  };

  const handleCloseAdd = () => {
    reset({
      stdId: "",
      actName: actName,
    });
    setOpenAdd(false);
  };

  const handleCancelAdd = (e) => {
    e.stopPropagation();
    reset({
      stdId: "",
      actName: actName,
    });

    handleCloseAdd();
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:8080/act?actId=${id}`)
      .then((response) => {
        console.log(initData);
        setInitData(initData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
    e.stopPropagation();
  };

  return (
    <Accordion expanded={expanded === id} onChange={handleChange(id)}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="cold-content"
        id="cold-header"
        sx={{ backgroundColor: "#E9F3F9" }}
      >
        <Grid
          container
          columns={9}
          sx={{
            width: "100%",

            display: "flex",
            alignActItems: "center",
            color: "#023556",
          }}
        >
          <Grid sx={styleItem} xs={1}>
            {index}
          </Grid>
          <Grid sx={styleItem} xs={1}>
            {id}
          </Grid>
          <Grid sx={styleItem} xs={3}>
            {actName}
          </Grid>
          <Grid sx={styleItem} xs={1}>
            {numOfDay}
          </Grid>
          <Grid sx={styleItem} xs={2}>
            {startDate}
          </Grid>
          <Grid xs={1} display="flex" justifyContent="space-evenly">
            <IconButton aria-label="Add student to act">
              <AddCircleIcon
                sx={{ color: green[500] }}
                onClick={handleOpenAdd}
              />
            </IconButton>

            <Dialog
              open={openAdd}
              onClose={handleCloseAdd}
              component="form"
              onSubmit={handleSubmit(onSubmitAdd)}
              onClick={(e) => e.stopPropagation()}
            >
              <DialogTitle>Thêm sinh viên</DialogTitle>
              <DialogContent>
                <Grid container spacing={2}>
                  {[
                    {
                      label: "Tên hoạt động",
                      gridSize: 12,
                      name: "actName",
                    },
                    {
                      label: "Id của sinh viên",
                      gridSize: 12,
                      name: "stdId",
                    },
                  ].map((item) => (
                    <Grid xs={item.gridSize} mt={0}>
                      <TextField
                        required
                        disabled={!!(item.name === "actName")}
                        autoFocus
                        onFocus={(e) => e.stopPropagation()}
                        {...register(`${item.name}`, {
                          required: `${item.label} is required`,
                          validate: async (value) =>
                            await asyncValidate(value, "stdId"),
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
                <Button onClick={handleCancelAdd}>Hủy</Button>
                <Button type="submit">Áp dụng</Button>
              </DialogActions>
            </Dialog>

            <IconButton aria-label="Delete act">
              <DeleteIcon sx={{ color: red[900] }} onClick={handleDelete} />
            </IconButton>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          columns={9}
          sx={{
            width: "100%",

            display: "flex",
            alignItems: "center",
            color: "#023556",
          }}
        >
          <Grid sx={colHeader} xs={1}>
            Họ
          </Grid>
          <Grid sx={colHeader} xs={3}>
            Tên
          </Grid>
          <Grid sx={colHeader} xs={1}>
            MSSV
          </Grid>
          <Grid sx={colHeader} xs={2}>
            Giới tính
          </Grid>
          <Grid sx={colHeader} xs={2}>
            Ngày CTXH
          </Grid>
        </Grid>
        {ACT_INFO_DATA.filter((item) => item.activity.id === id).map(
          (item, infoIndex) => (
            <>
              <Divider />
              <Grid
                container
                columns={9}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  color: "#023556",
                  height: 60,
                }}
              >
                <Grid sx={styleItem} xs={1}>
                  {item.student.lastName}
                </Grid>
                <Grid sx={styleItem} xs={3}>
                  {item.student.firstName}
                </Grid>
                <Grid sx={styleItem} xs={1}>
                  {item.student.mssv}
                </Grid>
                <Grid sx={styleItem} xs={2}>
                  {item.student.sex}
                </Grid>
                <Grid sx={styleItem} xs={2}>
                  {item.student.socialDay}
                </Grid>
              </Grid>
            </>
          )
        )}
      </AccordionDetails>
    </Accordion>
  );
};
