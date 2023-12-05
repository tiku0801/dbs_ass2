import SearchIcon from "@mui/icons-material/Search";
import { InputBase, alpha, styled } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export const SearchBar = ({ handleSearch }) => {
  const handleChange = (e) => {
    handleSearch.setSearch(e.target.value);
  };
  return (
    <Search
      sx={{
        borderRadius: 10,
        border: 1,
        height: 40,
        alignContent: "center",
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Nhập '#' để tìm số phòng"
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        value={handleSearch.search}
      />
    </Search>
  );
};
