import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Rating from "./Rating";

function Product({ product }) {
  const [showReview, setShowReview] = useState(false);

  const handleMouseEnter = () => {
    setShowReview(true);
  };

  const handleMouseLeave = () => {
    setShowReview(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: "10px",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Abir Hasan applied transition properties
        '&:hover': { 
          transform: 'scale(1.05)',
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Abir Hasan applied box-shadow on hover
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name}
          style={{ objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
        />
        <CardContent style={{ textAlign: "left", padding: "16px" }}>
          <Typography gutterBottom variant="h6" component="div" style={{ marginBottom: "8px", backgroundColor: "#F3E5AB", paddingLeft: "10px" }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ display: 'flex', alignItems: 'center', marginBottom: "8px" }}>
            <Rating value={product.rating} color="#f8e825" />
            <span style={{ marginLeft: "8px" }}>{product.numReviews} reviews</span>
          </Typography>
          {showReview && (
            <Typography variant="body2" color="text.primary" style={{ fontStyle: 'italic', marginTop: '8px' }}>
              {product.reviews.length > 0 && (
                <div>
                  <span>{product.reviews[0].name}:</span> {product.reviews[0].comment}
                </div>
              )}
            </Typography>
          )}
          <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
            £{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default Product;
