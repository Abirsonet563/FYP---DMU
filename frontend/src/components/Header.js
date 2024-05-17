import React from "react"; // Import React
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { Link } from "react-router-dom"; // Import Link for routing
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core"; // AH Import Material-UI components
import { ShoppingCart, AccountCircle } from "@material-ui/icons"; // AH Import Material-UI icons
import { makeStyles } from "@material-ui/core/styles"; // AH Import Material-UI styles
import SearchBox from "./SearchBox"; // AH Import custom SearchBox component
import logo from "../logo.png"; 
import { logout } from "../redux/slices/userSlice"; 

// AH Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#212121",
  },
  grow: {
    flexGrow: 1,
  },
  menuItem: {
    minWidth: 180,
  },
  link: {
    textDecoration: "none",
    color: "#fff",
  },
}));

const Header = () => {
  const classes = useStyles(); 
  const dispatch = useDispatch(); 
  const userLogin = useSelector((state) => state.user); 
  const { userDetails } = userLogin; 

  const [anchorEl, setAnchorEl] = React.useState(null); 
  const open = Boolean(anchorEl); 

  // AH Implement Function to handle opening profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // AH Set anchor element to current target
  };

  // AH Implement Function to handle closing profile menu
  const handleMenuClose = () => {
    setAnchorEl(null); // AH Implement Set anchor element to null
  };

  // Function to handle user logout
  const handleLogout = () => {
    dispatch(logout()); // AH Implement Dispatch logout action
    handleMenuClose(); // AH Implement Close profile menu
    window.location.reload(); // AH Implement Reload the page
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* Logo */}
          <Link to="/" className={classes.link}>
          <img
  src={logo}
  alt="Abir Hasan"
  style={{
    height: 60,
    borderRadius: "50%", // AH Make the image round
    objectFit: "cover", // AH Ensure the image fills the container without stretching
  }}
/>

          </Link>

        
          <div style={{ marginLeft: "5vw" }}>
            <SearchBox />
          </div>

          <div className={classes.grow} />

          
          <div>
            <IconButton
              aria-label="show cart items"
              color="inherit"
              component={Link}
              to="/cart"
              style={{ color: "white" }}
            >
              <ShoppingCart />
            </IconButton>
          </div>

          {/* AH Implement Profile and login/logout icons */}
          {userDetails ? ( // If user is logged in
            <>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>

              {/* AH Implement Profile menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem
                  className={classes.menuItem}
                  component={Link}
                  to="/profile"
                  onClick={handleMenuClose}
                >
                  Profile
                </MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleLogout}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : ( // If user is not logged in
            <div>
              <IconButton
                aria-label="login"
                color="inherit"
                component={Link}
                to="/login"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
