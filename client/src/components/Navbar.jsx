import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from "react"
import logo from '../images/logo.png'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const userNotLoggedIn = ['Charts', 'News', 'Featured🔐', 'Simulator🔐'];
const userLoggedIn = ['Charts', 'News', 'Blogs', 'Featured🔐', 'Transactions', 'Simulator'];
const userPremiumEnabled = ['Charts', 'News', 'Blogs', 'Featured', 'Transactions', 'Simulator'];
const userMentorAccess = ['Charts', 'News', 'Blogs', 'Featured', 'MentorPanel', 'MyBlogs', 'Transactions', 'Simulator'];

const settingsNotLoggedIn = ["Authenticate"]
const settingsLoggedIn = ['Profile', 'Logout'];

//Routes for every set : 
const routeUserNotLoggedIn = ['/charts', '/news', '/login', '/login'];
const routeUserLoggedIn = ['/charts', '/news', '/blogs', '/pricing', '/transactions', '/simulator'];
const routeUserPremiumEnabled = ['/charts', '/news', '/blogs', '/featured', '/transactions', '/simulator'];
const routeUserMentorAccess = ['/charts', '/news', '/blogs', '/featured', '/mentorPanel', '/myMentorBlogs', '/transactions', '/simulator'];

// const route
const routeSettingNotLoggedIn = ['/login'];
const routeSettingLoggedIn = ['/profile', '/logout']

export default function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //Page dynamic Code : 

    const [activePage, setActivePage] = useState('');
    const storedData = useSelector((state) => state.userData)

    let mainNavbar = [];
    let mainSideFunctionBar = [];

    //routing arrays : 
    let mainRoutes = [];
    let SettingRoute = []

    if (storedData.isUserloggedIn === true) {
        mainNavbar = userLoggedIn
        mainSideFunctionBar = settingsLoggedIn
        //route
        mainRoutes = routeUserLoggedIn
        SettingRoute = routeSettingLoggedIn

        //Further conditions to be checked : 
        if (storedData.isMentor === true) {
            mainNavbar = userMentorAccess
            mainRoutes = routeUserMentorAccess
        }
        if (storedData.isPremium === true) {
            mainNavbar = userPremiumEnabled
            mainRoutes = routeUserPremiumEnabled
        }
    }
    else {
        mainNavbar = userNotLoggedIn
        mainSideFunctionBar = settingsNotLoggedIn

        mainRoutes = routeUserNotLoggedIn
        SettingRoute = routeSettingNotLoggedIn
    }

    const handlePageClick = (page) => {
        setActivePage(page);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#21222A', margin: "0" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    {/* <img src={logo} style={{width : "80px", height : "80px", marginRight : "15px"}}></img> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.15rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ChaiTrade
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {mainNavbar.map((page, index) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link to={mainRoutes[index]} style={{ textDecoration: 'none', color: '#000' }}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ChaiTrade
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {mainNavbar.map((page, index) => (
                            <Link to={mainRoutes[index]} style={{ textDecoration: 'none', color: '#000' }}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    // onClick={() => handlePageClick(page)}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'yellow'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = activePage === page ? 'yellow' : 'white'}
                                    sx={{
                                        my: 2,
                                        color: activePage === page ? 'your-active-color' : 'white',
                                        display: 'block',
                                        marginRight: index < mainNavbar.length - 1 ? 2 : 0
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>

                        ))}
                    </Box>

                    {storedData.isUserloggedIn && <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {mainSideFunctionBar.map((setting, index) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Link to={SettingRoute[index]} style={{ textDecoration: 'none', color: '#000' }}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>}
                    {!storedData.isUserloggedIn && <Box sx={{ flexGrow: 1, ml : '50%' ,display: { xs: 'none', md: 'flex' } }}>
                        {mainSideFunctionBar.map((page, index) => ( 
                            <Link to={SettingRoute[index]} style={{ textDecoration: 'none', color: '#000' }}>
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    // onClick={() => handlePageClick(page)}
                                    onMouseEnter={(e) => e.currentTarget.style.color = 'yellow'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = activePage === page ? 'yellow' : 'white'}
                                    sx={{
                                        my: 2,
                                        color: activePage === page ? 'your-active-color' : 'white',
                                        display: 'block',
                                        marginRight: index < mainNavbar.length - 1 ? 2 : 0
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>

                        ))}
                    </Box>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
