import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, InputBase, IconButton } from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f2f2f2", // Abir Hasan applied light gray background color
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Abir Hasan slightly elevated box shadow
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1), // Abir Hasan reduced left margin
    flex: 1,
    fontSize: "1rem",
    padding: theme.spacing(1), // Abir Hasan added padding to input
  },
  iconButton: {
    marginRight: "15px",
    padding: theme.spacing(1),
    backgroundColor: "black",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#333",
    },
  },
}));

function SearchBox() {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/?keyword=${keyword}&page=1`);
  };

  return (
    <Box component="form" onSubmit={submitHandler} className={classes.root}>
      <InputBase
        placeholder="Search for products..."
        className={classes.input}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}

export default SearchBox;
