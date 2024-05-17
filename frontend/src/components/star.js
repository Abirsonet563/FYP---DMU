import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    backgroundImage: `url(https://source.unsplash.com/random/800x600)`, // AH use this URL for Image
    backgroundSize: "cover",
    height: "300px",
    width: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "200px auto", // AH set center the container horizontally
    borderRadius: "10px", // AH set rounded corners for the container
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)", // AH set box shadow for depth
  },
  text: {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.7)", // AH set semi-transparent black background for better readability
    padding: "20px", // AH set increased padding for better spacing
    borderRadius: "5px", // AH set rounded corners for the text box
  },
}));

const Star = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <p>Hi, It's secure and safe to use.</p>
      </div>
    </div>
  );
};

export default Star;
