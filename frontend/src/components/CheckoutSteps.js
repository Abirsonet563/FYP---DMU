import React from "react";
import { Link } from "react-router-dom"; 
import { Breadcrumbs, Typography } from "@material-ui/core"; // AH Importing Material-UI components
import { makeStyles } from "@material-ui/core/styles";

//AH Define styles using makeStyles hook
const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: theme.palette.grey[600],
    textDecoration: "none",
  },
  activeLink: {
    color: theme.palette.primary.main,
  },
}));

// AH Implement CheckoutSteps functional component
function CheckoutSteps({ step1, step2, step3 }) {
  const classes = useStyles();

  const renderStepLink = (to, text, isActive) => (
    <Link to={to} className={`${classes.link} ${isActive ? classes.activeLink : ""}`}>
      {text}
    </Link>
  );

  // AH Use JSX rendering logic for the component
  return (
    <Breadcrumbs aria-label="breadcrumb"> {}
      {}
      {renderStepLink("/login", step1 ? "Login" : "Login (Incomplete)", step1)}
      {renderStepLink("/shipping", step2 ? "Shipping" : "Shipping (Incomplete)", step2)}
      <Typography
        color={step3 ? "textPrimary" : "textSecondary"}
        className={`${classes.link} ${step3 ? classes.activeLink : ""}`} // AH Implement Conditional styling
      >
        {step3 ? "Place Order" : "Place Order (Incomplete)"}
      </Typography>
    </Breadcrumbs>
  );
}

export default CheckoutSteps;
