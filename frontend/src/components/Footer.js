import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#f5f5f5", padding: "20px 0" }}>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body1" color="textSecondary" align="center">
              &copy; {new Date().getFullYear()} Abir Hasan. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
