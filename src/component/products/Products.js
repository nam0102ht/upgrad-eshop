import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Products.css'
import ProductCard from '../cards/ProductCard';
import { Grid } from '@mui/material';
import ToggleButtonCategory from '../toggleButton/ToggleButtonCategory';
import { deleteProduct, getProducts } from '../../services/handleProducts';
import PrimarySearchAppBar from "../navbar/PrimarySearchAppBar";
import { useNavigate, useParams } from 'react-router-dom';
import SortBy from '../sortby/SortBy';
import { SnackbarCustom, handleBuyHelper, handleCategoryHelper, handleSearchWithoutIsSearchHelper } from '../form/Helper';

export default function Products(props) {
  const param = useParams()
  const [category, setCategory] = React.useState('all');
  var [openDialog, setOpenDialog] = React.useState(false)
  const isAdmin = sessionStorage.getItem('isAdmin')
  const [products, setProducts] = React.useState([{
    "name": "",
    "category": "",
    "price": 0,
    "description": "",
    "manufacturer": "",
    "availableItems": 0,
    "imageUrl": ""
  }])
  const navigate = useNavigate()
  const [message, setMessage] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const [product, setProduct] = React.useState({
    "name": "",
    "category": "",
    "price": 0,
    "description": "",
    "manufacturer": "",
    "availableItems": 0,
    "imageUrl": ""
  })
  const [severity, setSeverity] = React.useState("success")

  React.useEffect(() => {
    if (param.message !== null || param.message !== '') {
      if (param.message === "confirm") {
        setOpen(true)
        setMessage("Order placed successfully!")
      }
    }
    let prods = getProducts();
    prods.then(v => {
      setProducts(v)
      localStorage.setItem("products", JSON.stringify(v))
    })
  }, [param])

  const handleBuy = (event, product) => {
    handleBuyHelper(event, product, setOpen, setMessage, setSeverity, navigate)
  }

  const handleEdit = (event, product) => {
    event.preventDefault();
    navigate(`/product/modify/${product.id}`)
  }

  const handleDelete = async (event, product) => {
    event.preventDefault();
    setOpenDialog(true)
    setProduct(product)
  }

  const handleClose = async (event) => {
    event.preventDefault();
    setOpen(false)
  }

  const handleOnChange = (data) => {
    if (data.value === 'priceHighToLow') {
      let prods = getProducts();
      prods.then(v => {
        v.sort((a, b) => {
          return b.price - a.price
        })
        setProducts(v)
      })
    } else if (data.value === 'priceLowToHigh') {
      let prods = getProducts();
      prods.then(v => {
        v.sort((a, b) => {
          return a.price - b.price
        })
        setProducts(v)
      })
    } else if (data.value === 'newest') {
      let prods = getProducts();
      prods.then(v => {
        const newProds = v.reverse()
        setProducts(newProds)
      })
    } else {
      let prods = getProducts();
      prods.then(v => {
        setProducts(v)
      })
    }
  }

  const handleCategory = (event, newCategory) => {
    handleCategoryHelper(event, newCategory, setProducts, setCategory)
  };

  const handleSearch = (data) => {
      handleSearchWithoutIsSearchHelper(data, setProducts)
  }

  const handleClickDetail = (event, product) => {
    event.preventDefault();
    sessionStorage.setItem("productDetail", product)
    navigate(`/products/detail/${product.id}`)
  }

  const handleCloseDialog = (event) => {
    event.preventDefault();
    setOpenDialog(false)
  }

  const handleOk = async (event) => {
    event.preventDefault();
    let res = await deleteProduct(product)
    if (res.state) {
      setOpen(true)
      setMessage(`Product ${product.name} deleted successfully`)
      setSeverity('success')
      let prods = getProducts();
      prods.then(v => {
        setProducts(v)
      })
      setOpenDialog(false)
    } else {
      setOpen(true)
      setMessage(`Product ${product.name} deleted failed`)
      setSeverity('error')
      setOpenDialog(false)
    }
  }


  return (
      <Container component="main">
        <PrimarySearchAppBar
          handleOnChange={handleSearch}
        />
        <CssBaseline />
        <Box sx={{
            marginTop: 13,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <ToggleButtonCategory 
              category={category}
              handleCategory={handleCategory}
            />
        </Box>
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            alignItems: 'center',
          }}
        >
          <SortBy
              handleOnChange={handleOnChange}
            />
        </Box>
        <Box
          sx={{
              marginTop: 5,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
          }}>
            <SnackbarCustom
              open={open}
              severity={severity}
              message={message}
              handleClose={handleClose}
             />
            <Grid container spacing={3} justifyContent={'center'}>
            {
              products.map(v => {
                return <Grid item xs={4} key={v.id}>
                  <ProductCard 
                      image={v.imageUrl}
                      title={v.name}
                      id={v.id}
                      name={v.name}
                      prices={v.price}
                      description={v.description}
                      handleBuy={(event) => handleBuy(event, v)}
                      isAdmin={isAdmin}
                      handleEdit={event => handleEdit(event, v)}
                      handleDelete={event => handleDelete(event, v)}
                      handleOnClick={event => handleClickDetail(event, v)}
                      handleCloseDialog={handleCloseDialog}
                      handleOk={handleOk}
                      openDialog={openDialog}
                    />
              </Grid>
              })
            }
            </Grid>
          </Box>
      </Container>
  )
}

