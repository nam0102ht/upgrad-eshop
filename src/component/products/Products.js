import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './Products.css'
import ProductCard from '../cards/ProductCard';
import { Grid, Snackbar } from '@mui/material';
import ToggleButtonCategory from '../toggleButton/ToggleButtonCategory';
import { deleteProduct, getProducts } from '../../services/handleProducts';
import PrimarySearchAppBar from "../navbar/PrimarySearchAppBar";
import { useNavigate, useParams } from 'react-router-dom';
import SortBy from '../sortby/SortBy';
import { Alert } from '../form/Helper';

export default function Products(props) {
  const param = useParams()
  const [category, setCategory] = React.useState('all');
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
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem('profile'))

    if (user === null) {
      setOpen(true)
      setMessage('Please login to continue')
      setSeverity('error')
      return
    }
    
    navigate(`/products/detail/${product.id}`)
  }

  const handleEdit = (event, product) => {
    event.preventDefault();
    navigate(`/product/modify/${product.id}`)
  }

  const handleDelete = async (event, product) => {
    event.preventDefault();
    let res = await deleteProduct(product)
    if (res.state) {
      setOpen(true)
      let mess = `${product.name} ${res.message}`
      setMessage(mess)
      setSeverity('success')
      let prods = getProducts();
      prods.then(v => {
        setProducts(v)
      })
    } else {
      setOpen(true)
      let mess = `${res.message}`
      setMessage(mess)
      setSeverity('error')
    }
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
        event.preventDefault();
        setCategory(newCategory);
        if (newCategory === 'all') {
          let prods = getProducts();
          prods.then(v => {
            setProducts(v)
          })
        } else {
          let prods = getProducts();
          prods.then(k => {
            let h = k.filter(v => {
              return v.category === newCategory
            })
            setProducts(h)
          })
        }
  };

  const handleSearch = (data) => {
      let products = localStorage.getItem("products")
      const val = data.target.value 
      if (products === null && val !== null) {
        let p = getProducts();
        p.then(v => {
          localStorage.setItem("products", JSON.stringify(v))

          const value = v.filter(h => {
            return h.name.includes(val)
          })
          setProducts(value)
        });
      } else if (val !== null) {
        const prods = JSON.parse(products)
        const value = prods.filter(v => {
          return v.name.toLowerCase().includes(val.toLowerCase())
        })
        setProducts(value)
      } else {
        let p = getProducts();
        p.then(v => {
          setProducts(v)
        })
      }
  }

  const handleClickDetail = (event, product) => {
    event.preventDefault();
    localStorage.setItem("productDetail", product)
    navigate(`/products/detail/${product.id}`)
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
            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: "right" }}
              open={open}
              onClose={handleClose}
              key={'topRight'}
            >
              <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
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
                      isAdmin={localStorage.getItem('isAdmin')}
                      handleEdit={event => handleEdit(event, v)}
                      handleDelete={event => handleDelete(event, v)}
                      handleOnClick={event => handleClickDetail(event, v)}
                    />
              </Grid>
              })
            }
            </Grid>
          </Box>
      </Container>
  )
}

