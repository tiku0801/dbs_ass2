import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useRef, useState } from "react";
import usePagination from "../../hooks/usePagination";
import AddActDialog from "./components/AddActDialog";
import { SocialActivityRow } from "./components/SocialActivityRow";
import axios from "axios";

const colHeader = {
  textAlign: "center",
  fontWeight: 700,
  fontSize: 25,
  color: "#023556",
};

export default function SocialActivity() {
  const checkFirstRender = useRef(true);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [search, setSearch] = useState("");
  const [content, setContent] = React.useState({
    startDate: "",
    endDate: "",
    building_name: "",
    fileStatus: "",
  });
  const [initData, setInitData] = useState([]);

  const [rowNum, setRowNum] = React.useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:8080/act")
      .then((response) => {
        setInitData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [filteredData, setFilteredData] = useState(
    initData.sort((a, b) => (a.id > b.id ? 1 : -1))
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
            ? item.room_number.includes(search.slice(1))
            : item.first_name.toLowerCase().includes(search.toLowerCase()) ||
              item.student_id.toLowerCase().includes(search.toLowerCase()) ||
              item.last_name.toLowerCase().includes(search.toLowerCase());
        })
        .filter(
          (item) =>
            // (item.uploadDate >= content.startDate || !content.startDate) &&
            // (item.uploadDate <= content.endDate || !content.endDate) &&
            (item.building_name === content.building_name ||
              !content.building_name) &&
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
      <Box className="table-container">
        <Box>
          <Grid container columns={9} mb={2} mr={0}>
            {[
              {
                gridSize: 1,
                headerName: "STT",
                colName: "index",
              },
              {
                gridSize: 1,
                headerName: "Mã hoạt động",
                colName: "id",
              },
              {
                gridSize: 3,
                headerName: "Tên hoạt động",
                colName: "actName",
              },
              {
                gridSize: 1,
                headerName: "Ngày CTXH",
                colName: "numOfDay",
              },
              {
                gridSize: 2,
                headerName: "Thời gian bắt đầu",
                colName: "startDate",
              },
            ].map((item) => (
              <Grid
                sx={colHeader}
                lg={item.gridSize}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {item.colName !== "index" ? (
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
                ) : (
                  <></>
                )}
                {item.headerName}
              </Grid>
            ))}
            <Grid
              lg={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
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
            <AddActDialog
              open={open}
              setOpen={setOpen}
              initData={initData}
              setInitData={setInitData}
            ></AddActDialog>
          </Grid>
        </Box>
        {data.map((ActItem, index) => {
          return (
            <SocialActivityRow
              {...ActItem}
              index={index}
              initData={initData}
              setInitData={setInitData}
            ></SocialActivityRow>
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
