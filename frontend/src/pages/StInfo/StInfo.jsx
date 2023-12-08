import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Alert,
  Box,
  Button,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import FilterSelect from "../../components/FilterSelect";
import { SearchBar } from "../../components/SearchBar";
import usePagination from "../../hooks/usePagination";
import { StInfoRow } from "./components/StInfoRow";
import AddStuDialog from "./components/AddStuDialog";

const colHeader = () => ({
  textAlign: "center",
  fontWeight: 700,
  fontSize: 25,
  color: "#023556",
});

export default function StInfo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [initData, setInitData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const fetchActInfoData = () => {
    axios
      .get("http://localhost:8080/list")
      .then((response) => {
        setInitData(
          response.data.map((item) => {
            const [roomNumber, buildingName] = item.room.roomName.split("-");
            return {
              studentId: item.student.id,
              id: item.id,
              firstName: item.student.firstName,
              lastName: item.student.lastName,
              roomNumber: roomNumber,
              buildingName: buildingName,
              mssv: item.student.mssv,
              sex: item.student.sex,
              socialDay: item.student.socialDay,
            };
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchActInfoData();
  }, []);

  const checkFirstRender = useRef(true);

  const [search, setSearch] = useState("");
  const [content, setContent] = React.useState({
    sex: "",
    buildingName: "",
  });
  const [rowNum, setRowNum] = React.useState(10);

  const [filteredData, setFilteredData] = useState(
    initData.sort((a, b) => (a.firstName > b.firstName ? 1 : -1))
  );

  const [sort, setSort] = useState({ order: "ASC", col: "firstName" });

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
            ? item.roomNumber.includes(search.slice(1))
            : item.firstName.toLowerCase().includes(search.toLowerCase()) ||
              item.mssv.toLowerCase().includes(search.toLowerCase()) ||
              item.lastName.toLowerCase().includes(search.toLowerCase());
        })
        .filter(
          (item) =>
            (item.buildingName === content.buildingName ||
              !content.buildingName) &&
            (item.sex === content.sex || !content.sex)
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
                            if (a.buildingName > b.buildingName) {
                              return 1;
                            }
                            if (b.buildingName > a.buildingName) {
                              return -1;
                            }
                            return 0;
                          })
                          .map((item) => item.buildingName)
                      ),
                    ]
                  : [
                      ...new Set(
                        initData
                          .filter((item) => item.venue === content.venue)
                          .sort(function (a, b) {
                            if (a.buildingName > b.buildingName) {
                              return 1;
                            }
                            if (b.buildingName > a.buildingName) {
                              return -1;
                            }
                            return 0;
                          })
                          .map((item) => item.buildingName)
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
              items={[...new Set(initData.map((item) => item.sex))]}
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
                colName: "index",
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
                {item.colName === "index" ? (
                  <></>
                ) : (
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
                )}
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
              <AddStuDialog
                open={open}
                setOpen={setOpen}
                fetchActInfoData={fetchActInfoData}
                initData={initData}
                setAlert={setAlert}
                setAlertContent={setAlertContent}
              ></AddStuDialog>
            </Grid>
          </Grid>
        </Box>
        {data.map((item, index) => {
          return (
            <StInfoRow
              key={item.id}
              {...item}
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
      {alert ? (
        <Alert
          sx={{ position: "fixed", bottom: "3em", zIndex: "100000" }}
          severity="error"
        >
          {alertContent}
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );
}
