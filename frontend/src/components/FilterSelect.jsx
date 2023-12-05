import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterSelect({ value, items, handleFilter, id }) {
  const handleChange = (event) => {
    handleFilter.setContent((prev) => ({
      ...prev,
      [`${id}`]: event.target.value,
    }));
  };

  return (
    <FormControl
      sx={{
        m: 1,
        minWidth: 120,
        backgroundColor: "#E9F3F9",
      }}
      size="small"
    >
      <InputLabel id="demo-simple-select-label">{value}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={handleFilter.content}
        label={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {items.map((item) => (
          <MenuItem value={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
