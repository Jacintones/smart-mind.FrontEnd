import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { createTheme, ThemeProvider } from '@mui/material';
import { useRouter } from 'next/navigation'

const theme = createTheme({
  palette: {
    primary: {
      main: '#240046', // Defina a cor personalizada aqui
    },
  },
});

export default function MenuAppBar() {
  const [auth, setAuth] = React.useState(true);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState({
    login: "",
    nome: "",
    sobrenome: '',
    nomeCompleto: "",
    email: "",
    senha: "",
    idade: 0,
    imagemUrl: null,
    testes: [],
    id: ''
  })
  const router = useRouter();

  const handleProfileMenu = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchorEl(null);
    setMenuAnchorEl(null);
  };

  React.useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []) 
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontWeight: 'bold'}}>
              Smart-Mind
            </Typography>
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 , marginLeft: 120, fontWeight: 'bold'}}>
              Olá, {user.nome}
            </Typography>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={profileAnchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(profileAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleClose(); router.push('/User'); }}>Minha conta</MenuItem>
            </Menu>

          </Toolbar>
        </AppBar>

        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => { handleClose(); router.push('/Login'); }}>Login</MenuItem>
          <MenuItem onClick={() => { handleClose(); router.push('/Cadastro'); }}>Cadastro</MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

