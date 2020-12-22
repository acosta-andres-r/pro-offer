import React from 'react';
import { Link, } from "react-router-dom";

import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';

const sellMenu = [
  {
    name: 'My products',
    route: '/sell'
  },
  {
    name: 'Add product',
    route: '/sell/add'
  }
]

const profileMenu = [
  {
    name: 'Profile',
    route: '/'
  },
  {
    name: 'My account',
    route: '/'
  }
]

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '65ch',
    },
    [theme.breakpoints.only('md')]: {
      width: '50ch',
    },
    [theme.breakpoints.only('sm')]: {
      width: '35ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [menuItems, setMenuItems] = React.useState([]);

  const handleMenuOpen = (event, items) => {
    setAnchorEl(event.currentTarget);
    setMenuItems([...items]);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setMenuItems([]);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Additional Functions

  const handleMenuItemClose = (route) => {
    handleRedirect(route);
    handleMenuClose();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRedirect("/search/" + event.target.value)
    }
  }

  const handleRedirect = (pathName) => {
    window.location.pathname = pathName;
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItems.map((item, index) => {
        return (
          <MenuItem key={index} onClick={() => handleMenuItemClose(item.route)}>{item.name}</MenuItem>
        )
      })}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={(event) => { handleMenuOpen(event, sellMenu) }}>
        <IconButton
          aria-label="show 0 new notifications"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Badge badgeContent={0} color="secondary">
            <AddAPhotoIcon />
          </Badge>
        </IconButton>
        <p>Sell</p>
      </MenuItem>
      <MenuItem
        onClick={() => { handleRedirect("/admin") }}
      >
        <IconButton aria-label="show 0 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <ForumIcon />
          </Badge>
        </IconButton>
        <p>Admin</p>
      </MenuItem>
      <MenuItem onClick={(event) => { handleMenuOpen(event, profileMenu) }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} >
      <AppBar position="fixed" style={{ background: '#4C6B71' }}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <MenuItem onClick={() => { handleRedirect("/") }}>
            <Typography className={classes.title} variant="h6" >
              Pro-Offer
          </Typography>
          </MenuItem>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              // onChange={handleValueSearch}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <MenuItem
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={(event) => handleMenuOpen(event, sellMenu)}
            >
              <IconButton
                aria-label="show 0 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="secondary">
                  <AddAPhotoIcon />
                </Badge>
              </IconButton>
              <p>Sell</p>
            </MenuItem>
            <MenuItem
              onClick={() => { handleRedirect("/admin") }}
            >
              <IconButton aria-label="show 0 new mails" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <ForumIcon />
                </Badge>
              </IconButton>
              <p>Admin</p>
            </MenuItem>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleMenuOpen}
              onClick={(event) => { handleMenuOpen(event, profileMenu) }}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(event) => handleMobileMenuOpen(event,)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
