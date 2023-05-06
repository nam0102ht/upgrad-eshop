import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import './PrimarySearchApp.css'
import { CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '35ch',
      },
    },
  }));

const TextLink = styled('a') (({ theme }) => ({
  color: 'inherit',
  textDecoration: 'underline',
  fontSize: '16px',
}));

const ButtonLogOut = styled('button') (( {theme}) => ({
  backgroundColor: 'red',
  padding: '0.5em',
  marginLeft: '0.6em',
  marginRight: '0.6em',
  border: 'unset',
  borderRadius: '0.3em',
  color: 'inherit'
}));

const DivCustomize = styled('div') (({theme}) => ({

}));
export default function PrimarySearchAppBar(props) {
  const navigate = useNavigate()
  const [isLogined, setIsLogined] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);


  React.useEffect(() => {
      var login = localStorage.getItem("isLogIn")
      if (login === 'true') {
        let user = localStorage.getItem("user")
        let currentDate = new Date()
        if (currentDate.getDate() > user.exp) {
          navigate("/login")
        } else {
          setIsLogined(login)
        }
      }
      let path = window.location.href
      let conditionPath = path.includes("/login")
      setIsSearch(conditionPath)
  }, [navigate])

  const handleLogOut = () => {
    localStorage.removeItem("isLogIn")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("orders")
    localStorage.removeItem("productDetail")
    localStorage.removeItem("product")
    localStorage.removeItem("profile")
    localStorage.removeItem("address")
    localStorage.removeItem("products")
    navigate("/login")
  }


  return (
      <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: '#3f51b5' }}>
        <CssBaseline />
        <AppBar position="fixed" component="nav">
          <Toolbar className='groupIconAndSearch'>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className='groupIcon'
              sx={{ mr: 2 }}
              onClick={() => navigate("/home")}
            >
              <div className='groupIconShoppingCart'>
                <div>
                  <ShoppingCart />
                </div>
                <div>
                  upGrad E-Shop
                </div>
              </div>
            </IconButton>
            { 
            isSearch ? <></> :
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Search
                onChange={props.handleOnChange}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Typography>
          }
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
            <Box sx={{ display: { xs: 'none', md: 'flex' }}} className='groupLoginProduct' >
                { !isLogined ?  
                <DivCustomize>
                  <DivCustomize>
                    <TextLink href='/login'>Login</TextLink>
                  </DivCustomize>
                  <DivCustomize>
                    <TextLink href='/signup'>Sign Up</TextLink>
                  </DivCustomize>
                </DivCustomize> :
                <DivCustomize>
                  <DivCustomize>
                    <TextLink href='/home'>Home</TextLink>
                  </DivCustomize>
                  { localStorage.getItem('isAdmin') === 'ADMIN' ?
                    <DivCustomize>
                      <TextLink href='/addProduct'>Add Product</TextLink>
                    </DivCustomize> : null
                  }
                  <DivCustomize>
                    <ButtonLogOut onClick={handleLogOut}>LOGOUT</ButtonLogOut>
                  </DivCustomize>
                </DivCustomize>
              }
            </Box>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
  );
  }
