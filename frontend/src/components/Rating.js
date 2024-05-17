import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";
import { Star, StarHalf, StarBorder } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  starIcon: {
    color: "#f8d300", // AH set Yellow color for stars
    fontSize: "1rem", // AH set Adjust the size of stars
  },
}));

function Rating({ value, text }) {
  const classes = useStyles();

  const renderStars = () => {
    const stars = [];
    let remainingValue = value;

    for (let i = 0; i < 5; i++) {
      if (remainingValue >= 1) {
        stars.push(<Star key={i} className={classes.starIcon} />);
      } else if (remainingValue >= 0.5) {
        stars.push(<StarHalf key={i} className={classes.starIcon} />);
      } else {
        stars.push(<StarBorder key={i} className={classes.starIcon} />);
      }
      remainingValue -= 1;
    }

    return stars;
  };

  return (
    <Box display="flex" alignItems="center">
      {renderStars()}
      <Typography variant="subtitle2" color="textSecondary" style={{ marginLeft: "5px" }}>
        {text ? text : ""}
      </Typography>
    </Box>
  );
}

export default Rating;
