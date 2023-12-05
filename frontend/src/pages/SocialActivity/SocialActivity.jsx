import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
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
import { SocialActivityRow } from "./components/SocialActivityRow";
import usePagination from "../../hooks/usePagination";
import { MOCK_DATA } from "./MOCK_DATA";
import AddIcon from "@mui/icons-material/Add";

const colHeader = () => ({
  textAlign: "center",
  fontWeight: 700,
  fontSize: 25,
  color: "#023556",
});

export default function SocialActivity() {
  const checkFirstRender = useRef(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    console.log(1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(open);
  };
  const [search, setSearch] = useState("");
  const [content, setContent] = React.useState({
    startDate: "",
    endDate: "",
    building_name: "",
    fileStatus: "",
  });
  const [rowNum, setRowNum] = React.useState(5);

  const [filteredData, setFilteredData] = useState(
    MOCK_DATA.sort((a, b) => (a.id > b.id ? 1 : -1))
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
      MOCK_DATA.filter((item) => {
        return search.toLowerCase() === "" || search.toLowerCase() === "#"
          ? item
          : search.toLowerCase()[0] === "#"
          ? item.room_number.includes(search.slice(1))
          : item.first_name.toLowerCase().includes(search.toLowerCase()) ||
            item.student_id.toLowerCase().includes(search.toLowerCase()) ||
            item.last_name.toLowerCase().includes(search.toLowerCase());
      }).filter(
        (item) =>
          // (item.uploadDate >= content.startDate || !content.startDate) &&
          // (item.uploadDate <= content.endDate || !content.endDate) &&
          (item.building_name === content.building_name ||
            !content.building_name) &&
          (item.sex === content.sex || !content.sex)
      )
    );

    setPage(0);
  }, [search, content]);

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
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mt={1}
        mb={1}
      >
        <Grid container>
          <Grid display={"flex"} alignItems={"center"}>
            <Button
              onClick={handleOpen}
              startIcon={<AddIcon />}
              variant="outlined"
              size="large"
              sx={{ backgroundColor: "#023556", color: "white" }}
            >
              Add
            </Button>
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
                      //   defaultValue: `${last_name}`,
                    },
                    {
                      label: "Tên",
                      gridSize: 5,
                      type: "first_name",
                      //   defaultValue: `${first_name}`,
                    },
                    {
                      label: "MSSV",
                      gridSize: 6,
                      type: "student_id",
                      //   defaultValue: `${student_id}`,
                    },
                    {
                      label: "Giới tính",
                      gridSize: 6,
                      type: "sex",
                      //   defaultValue: `${sex}`,
                    },
                    {
                      label: "Tòa",
                      gridSize: 4,
                      type: "building_name",
                      //   defaultValue: `${building_name}`,
                    },
                    {
                      label: "Phòng",
                      gridSize: 4,
                      type: "room_number",
                      //   defaultValue: `${room_number}`,
                    },
                    {
                      label: "Số ngày CTXH",
                      gridSize: 4,
                      type: "ctxh",
                      //   defaultValue: `${ctxh}`,
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
          </Grid>
          <Grid>
            <FilterSelect
              id={"building_name"}
              value={"Tòa"}
              handleFilter={{ content: content.building_name, setContent }}
              items={
                content.venue === ""
                  ? [
                      ...new Set(
                        MOCK_DATA.sort(function (a, b) {
                          if (a.building_name > b.building_name) {
                            return 1;
                          }
                          if (b.building_name > a.building_name) {
                            return -1;
                          }
                          return 0;
                        }).map((item) => item.building_name)
                      ),
                    ]
                  : [
                      ...new Set(
                        MOCK_DATA.filter((item) => item.venue === content.venue)
                          .sort(function (a, b) {
                            if (a.building_name > b.building_name) {
                              return 1;
                            }
                            if (b.building_name > a.building_name) {
                              return -1;
                            }
                            return 0;
                          })
                          .map((item) => item.building_name)
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
              items={[...new Set(MOCK_DATA.map((item) => item.sex))]}
            ></FilterSelect>
          </Grid>
        </Grid>
        <Grid>
          <SearchBar handleSearch={{ search, setSearch }}></SearchBar>
        </Grid>
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
                colName: "student_id",
              },
              {
                gridSize: 2,
                headerName: "Họ và tên đệm",
                colName: "last_name",
              },
              {
                gridSize: 1,
                headerName: "Tên",
                colName: "first_name",
              },
              {
                gridSize: 1,
                headerName: "Giới tính",
                colName: "sex",
              },
              {
                gridSize: 1,
                headerName: "Phòng",
                colName: "room_number",
              },
              {
                gridSize: 1,
                headerName: "Tòa",
                colName: "building_name",
              },
              {
                gridSize: 1,
                headerName: "CTXH",
                colName: "ctxh",
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
          </Grid>
        </Box>
        {data.map((item) => {
          return (
            <SocialActivityRow key={item.ID} {...item}></SocialActivityRow>
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
      {/* <Fab size="medium" color="primary" aria-label="add">
        <AddIcon />
      </Fab> */}
    </Box>
  );
}
ID,
  first_name,
  last_name,
  CTXH_day,
  phone_number,
  CCCD,
  start_day,
  start_year,
  end_year,
  date_of_birth,
  sex,
  email,
  university_name;
