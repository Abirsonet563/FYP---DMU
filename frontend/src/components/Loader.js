import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", 
    alignItems: "center", height: "100vh", backgroundColor: "#f5f5f5" }}>
      <CircularProgress size={100} color="primary" />
    </div>
  );
}
