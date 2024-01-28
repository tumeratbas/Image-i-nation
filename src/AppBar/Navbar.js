import React, { useState } from 'react';
import './Navbar.css';
import { AppBar, Toolbar, Typography, Box, Tooltip, IconButton, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useClerk } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const { openSignIn, user, signOut } = useClerk();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleRemoverClick = () => {
    navigate('/remover');
  };
  // const handleVideoClick = () => {
  //   navigate('/video');
  // };
  const handleCompressClick = () => {
    navigate('/compress');
  };
  
  const handleHomeClick = () => {
    navigate('/');
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

  const handleSignOut = async () => {
    await signOut();
    handleCloseUserMenu();
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'black', height: '65px' }}>
      <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="main-logo.png" alt="" style={{ height: '44px', width: '44px', borderTop: '10px', borderLeft: '34px' }} />
          <div className="label">
            <div className="IMAGE-i-NATION" onClick={handleHomeClick} style={{ borderTop: '10px' , cursor: 'pointer' }}>
              IMAGE
              <br />
              - I -
              <br />
              NATION
            </div>
          </div>
        </div>

        <div className="compress-page" onClick={handleCompressClick}>
            <div className="compress-wrapper">COMPRESS</div>
        </div>
        
        <div className="remove-page" onClick={handleRemoverClick}>
            <div className="remove-wrapper">REMOVE BACKGROUND</div>
        </div>
        {/* <div className="video-page" onClick={handleVideoClick}>
            <div className="video-wrapper">video</div>
        </div> */}

        {/* Sağ tarafta Clerk ile giriş yapma kısmı */}
        <div className='giris'>
        <Box sx={{ flexGrow: 0 }}>
          {user ? (
            <Tooltip title="Ayarları Aç">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.fullName} src={user.image} />
              </IconButton>
            </Tooltip>
          ) : (
            <Button onClick={openSignIn} sx={{ color: 'white', fontFamily:'Josefin Sans, sans-serif', justifyContent:'end',textAlign:'end', }}>
              Sign In
            </Button>
          )}
          <Menu
            sx={{ mt: '50px' }}
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
            {user ? (
              <MenuItem onClick={handleSignOut}>
                <Typography textAlign="center">SignedOut</Typography>
              </MenuItem>
            ) : null}
          </Menu>
        </Box>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;