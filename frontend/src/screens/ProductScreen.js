import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProductDetails,
  createReview 
  } from "../redux/slices/productSlice";
  
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../redux/slices/cartSlice";

//AH import component for displaying product details and handling user interactions
function ProductScreen({ match, history }) {
  const [qty, setQty] = useState(1); 
  // AH import state for quantity of items
  const [rating, setRating] = useState(0); 
  // AH import state for rating value
  const [comment, setComment] = useState(""); 
  // AH import state for review comment

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.product.productDetails); 
  // AH Fetch product details from Redux store
  const { product, loading, error } = productDetails; 
  // AH Implement destructure product details

  const userLogin = useSelector((state) => state.user ); 
  // AH Fetch user login state
  const { userDetails } = userLogin; 
  // AH Destructure user details

  const productReviewCreate = useSelector((state) => state.product.createReview); 
  // AH Fetch product review state
  const { loading: loadingProductReview, error: errorProductReview,
 success: successProductReview } = productReviewCreate; // Destructure product review details

  useEffect(() => {
    // Reset rating and comment if review was successfully submitted
    if (successProductReview) {
      setRating(0);
      setComment("");
    }

    dispatch(fetchProductDetails(match.params.id)); 
    //AH Fetch product details
  }, [dispatch, match, successProductReview]); 
  // AH Implement array for useEffect

  // Handle adding items to cart
  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
    dispatch(addToCart(match.params.id, qty));
  };
  
  // Handle form submission for creating a review
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {/* Product Details Section */}
          <Row>
            <Col md={3}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="product-details">
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item className="product-details">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  />
                </ListGroup.Item>

                <ListGroup.Item className="product-details">Price: ৳{product.price}</ListGroup.Item>

                <ListGroup.Item className="product-details">
                  <strong>Description:</strong> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            {/* Add to Cart Section */}
            <Col>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>৳{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item >
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control style={{  border:"2px solid black"}}
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* Reviews Section */}
          <Row>
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating color={"#f8e825"} value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h4>Write a Review</h4>
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Review submitted</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userDetails ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;