import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useRef, useState } from "react";
import FilterSelect from "../../components/FilterSelect";
import { SearchBar } from "../../components/SearchBar";
import { StInfoRow } from "./components/StInfoRow";
import usePagination from "../../hooks/usePagination";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import { red } from "@mui/material/colors";
import { useForm } from "react-hook-form";
// import { initData } from "./initData";

const colHeader = () => ({
  textAlign: "center",
  fontWeight: 700,
  fontSize: 25,
  color: "#023556",
});

export default function StInfo() {
  const defaultFormValues = {
    lastName: "",
    firstName: "",
    sex: "",
    roomNumber: "",
    buildingName: "",
    mssv: "",
    socialDay: "",
  };
  const addDataOnServer = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/list?roomName=${data.roomNumber}-${data.buildingName}`,
        { ...data }
      );
      fetchActInfoData();
      handleClose();
      reset(defaultFormValues);
    } catch (error) {
      console.error(error);
    }
  };
  const asyncValidate = async (value, name) => {
    // You should replace the URL and the backend validation logic
    const isDuplicate = initData.some((item) => item.student.mssv === value);

    if (isDuplicate) {
      return `${name} already exists`;
    }

    return true; // Value is unique
  };
  const onSubmit = (data) => {
    addDataOnServer(data);
  };

  const [initData, setInitData] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchActInfoData = () => {
    axios
      .get("http://localhost:8080/list")
      .then((response) => {
        setInitData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchActInfoData();
  }, []);

  useEffect(() => {}, []);

  const checkFirstRender = useRef(true);

  const form = useForm({
    defaultValues: defaultFormValues,
  });

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const handleOpen = () => {
    setOpen(true);
  };

  const getBuildingName = (roomName) => {
    const [a, b] = roomName.split("-");
    return b;
  };
  const getRoomNumber = (roomName) => {
    const [a, b] = roomName.split("-");
    return a;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    reset(defaultFormValues);
    handleClose();
  };
  const [search, setSearch] = useState("");
  const [content, setContent] = React.useState({
    sex: "",
    buildingName: "",
  });
  const [rowNum, setRowNum] = React.useState(5);

  const [filteredData, setFilteredData] = useState(
    initData.sort((a, b) =>
      a.student.firstName > b.student.firstName ? 1 : -1
    )
  );

  const [sort, setSort] = useState({ order: "ASC", col: "id" });

  const { data, page, totalPages, setPage } = usePagination(
    filteredData,
    rowNum
  );

  useEffect(() => {
    if (checkFirstRender.current) {
      checkFirstRender.current = false;
      return;
    }
    setFilteredData(
      initData
        .filter((item) => {
          return search.toLowerCase() === "" || search.toLowerCase() === "#"
            ? item
            : search.toLowerCase()[0] === "#"
            ? item.room.roomName.includes(search.slice(1))
            : item.student.firstName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              item.student.mssv.toLowerCase().includes(search.toLowerCase()) ||
              item.student.lastName
                .toLowerCase()
                .includes(search.toLowerCase());
        })
        .filter(
          (item) =>
            (getBuildingName(item.room.roomName) === content.buildingName ||
              !content.buildingName) &&
            (item.student.sex === content.sex || !content.sex)
        )
    );

    setPage(0);
  }, [search, content, initData]);

  const handleSort = (name) => {
    if (name === sort.col) {
      if (sort.order !== "DSC") {
        setFilteredData(
          [...filteredData].sort((a, b) => (a[name] > b[name] ? 1 : -1))
        );
        setSort((prev) => ({ ...prev, order: "DSC" }));
      } else {
        setFilteredData(
          [...filteredData].sort((a, b) => (a[name] < b[name] ? 1 : -1))
        );
        setSort((prev) => ({ ...prev, order: "ASC" }));
      }
    } else {
      setFilteredData(
        [...filteredData].sort((a, b) => (a[name] > b[name] ? 1 : -1))
      );
      setSort({ col: name, order: "DSC" });
    }
  };
  return (
    <Box className="content" pl={2} pr={2}>
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
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mt={1}
        mb={1}
      >
        <Grid container>
          <Grid>
            <FilterSelect
              id={"buildingName"}
              value={"Tòa"}
              handleFilter={{ content: content.buildingName, setContent }}
              items={
                content.buildingName === ""
                  ? [
                      ...new Set(
                        initData
                          .sort(function (a, b) {
                            if (
                              getBuildingName(a.room.roomName) >
                              getBuildingName(b.room.roomName)
                            ) {
                              return 1;
                            }
                            if (
                              getBuildingName(b.room.roomName) >
                              getBuildingName(a.room.roomName)
                            ) {
                              return -1;
                            }
                            return 0;
                          })
                          .map((item) => getBuildingName(item.room.roomName))
                      ),
                    ]
                  : [
                      ...new Set(
                        initData
                          .filter((item) => item.venue === content.venue)
                          .sort(function (a, b) {
                            if (
                              getBuildingName(a.room.roomName) >
                              getBuildingName(b.room.roomName)
                            ) {
                              return 1;
                            }
                            if (
                              getBuildingName(b.room.roomName) >
                              getBuildingName(a.room.roomName)
                            ) {
                              return -1;
                            }
                            return 0;
                          })
                          .map((item) => getBuildingName(item.room.roomName))
                      ),
                    ]
              }
            ></FilterSelect>
          </Grid>
          <Grid>
            <FilterSelect
              id={"sex"}
              value={"Giới tính"}
              handleFilter={{
                content: content.sex,
                setContent,
              }}
              items={[...new Set(initData.map((item) => item.student.sex))]}
            ></FilterSelect>
          </Grid>
        </Grid>
        <SearchBar handleSearch={{ search, setSearch }}></SearchBar>
      </Grid>
      <Box className="table-container">
        <Box>
          <Grid container columns={10}>
            {[
              {
                gridSize: 1,
                headerName: "STT",
                colName: "id",
              },
              {
                gridSize: 1,
                headerName: "MSSV",
                colName: "mssv",
              },
              {
                gridSize: 2,
                headerName: "Họ và tên đệm",
                colName: "lastName",
              },
              {
                gridSize: 1,
                headerName: "Tên",
                colName: "firstName",
              },
              {
                gridSize: 1,
                headerName: "Giới tính",
                colName: "sex",
              },
              {
                gridSize: 1,
                headerName: "Phòng",
                colName: "roomNumber",
              },
              {
                gridSize: 1,
                headerName: "Tòa",
                colName: "buildingName",
              },
              {
                gridSize: 1,
                headerName: "CTXH",
                colName: "socialDay",
              },
            ].map((item) => (
              <Grid
                sx={colHeader}
                lg={item.gridSize}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <KeyboardArrowRightIcon
                  sx={{
                    fontSize: "23px",
                    transform:
                      sort.col === item.colName
                        ? sort.order === "ASC"
                          ? "rotate(-90deg)"
                          : "rotate(90deg)"
                        : "",
                    transition: "transform 150ms ease",
                  }}
                  onClick={() => handleSort(item.colName)}
                />
                {item.headerName}
              </Grid>
            ))}
            <Grid xs={1} display="flex" justifyContent="center">
              <Button
                onClick={handleOpen}
                startIcon={<AddIcon />}
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 2,
                  backgroundColor: "#023556",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#01121e",
                  },
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
        {data.map((item, index) => {
          return (
            <StInfoRow
              key={item.id}
              {...item.room}
              {...item.student}
              studentId={item.student.id}
              index={index}
              initData={initData}
              setInitData={setInitData}
            ></StInfoRow>
          );
        })}
      </Box>
      <Box
        className="pagination-container"
        sx={{
          display: "flex",
          marginTop: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" pr={1}>
            Hàng/trang:
          </Typography>
          <ToggleButtonGroup
            value={rowNum}
            color="primary"
            exclusive
            onChange={(e, newValue) => {
              if (newValue !== null) setRowNum(newValue);
            }}
          >
            <ToggleButton sx={{ height: "2rem", width: "2rem" }} value={5}>
              5
            </ToggleButton>
            <ToggleButton sx={{ height: "2rem", width: "2rem" }} value={10}>
              10
            </ToggleButton>
            <ToggleButton sx={{ height: "2rem", width: "2rem" }} value={25}>
              25
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "50%",
            transform: "translate( 50%,0)",
          }}
        >
          <Pagination
            page={page + 1}
            count={totalPages}
            onChange={(event, value) => {
              setPage(value - 1);
            }}
            variant="outlined"
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
}
