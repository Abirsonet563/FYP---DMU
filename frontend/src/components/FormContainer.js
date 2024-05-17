import React from "react";
import { Grid, Container } from "@mui/material";

const FormContainer = ({ children }) => {
  return (
    <Container style={{ marginTop: "40px", marginBottom: "40px" }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormContainer;
