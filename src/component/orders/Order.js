import { Box, Container, CssBaseline, Snackbar } from '@mui/material'
import * as React from 'react'
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar'
import { deleteProduct, getProducts } from '../../services/handleProducts';
import StepperOrder from './Stepper';
import ProductSearch from '../products/ProductSearch';
import { useNavigate } from 'react-router-dom';
import { findAllAddress } from '../../services/handleAddress';
import { Alert } from '../form/Helper';

export default function Order() {
    const [products, setProducts] = React.useState([])
    const [productDelete, setProductDelete] = React.useState({
      "name": "",
      "category": "",
      "price": 0,
      "description": "",
      "manufacturer": "",
      "availableItems": 0,
      "imageUrl": ""
    })
    const [isSearch, setIsSearch] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [severity, setSeverity] = React.useState("success")
    const navigate = useNavigate()

    React.useEffect(() => {
        let prods = getProducts();
        prods.then(v => {
          setProducts(v)
          localStorage.setItem("products", JSON.stringify(v))
        })
      }, [])
    

    const handleSearch = (data) => {
        let products = localStorage.getItem("products")
        const val = data.target.value 
        if (products === null && val !== null) {
          setIsSearch(true)
          let p = getProducts();
          p.then(v => {
            localStorage.setItem("products", JSON.stringify(v))
  
            const value = v.filter(h => {
              return h.name.includes(val)
            })
            setProducts(value)
          });
        } else if (val !== null) {
          setIsSearch(true)
          const prods = JSON.parse(products)
          const value = prods.filter(v => {
            return v.name.toLowerCase().includes(val.toLowerCase())
          })
          setProducts(value)
        } else {
          setIsSearch(false)
          let p = getProducts();
          p.then(v => {
            setProducts(v)
          })
        }
        if (val === null || val === '') {
          setIsSearch(false)
        }
    }

    const handleClickDetail = (event, product) => {
      event.preventDefault();
      localStorage.setItem("productDetail", product)
      navigate(`/products/detail/${product.id}`)
    }

    const handleEdit = (event, product) => {
      event.preventDefault();
      navigate(`/product/modify/${product.id}`)
    }

    const handleBuy = (event, product) => {
      event.preventDefault();
      let user = JSON.parse(localStorage.getItem('profile'))
      
      let address = findAllAddress()
      address.then(v => {
        if (v.status) {
          if (v.data.length !== 0) {
            sessionStorage.setItem("address", JSON.stringify(v.data))
          }
          let order = {
            quantity: 1,
            user: user.id,
            product: product.id
          }
          let arrOrder = JSON.stringify([order])
          sessionStorage.setItem('orders', arrOrder)
          navigate(`/order`)
        }
      })
    }

    const handleClose = async (event) => {
      event.preventDefault();
      setOpen(false)
  }
  
    const handleDelete = async (event, product) => {
      event.preventDefault();
      setOpenDialog(true)
      setProductDelete(product)
    }

    const handleOk = async (event) => {
      event.preventDefault();
      let res = await deleteProduct(productDelete)
      if (res.state) {
        setOpen(true)
        setMessage(`Product ${productDelete.name} deleted successfully`)
        setSeverity('success')
        let prods = getProducts();
        prods.then(v => {
          setProducts(v)
        })
        setOpenDialog(false)
      } else {
        setOpen(true)
        setMessage(`Product ${productDelete.name} deleted failed`)
        setSeverity('error')
        setOpenDialog(false)
      }
    }

    const handleCloseDialog = (event) => {
      event.preventDefault();
      setOpenDialog(false)
    }

    return (
        <Container component="main">
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
            <PrimarySearchAppBar
                handleOnChange={handleSearch}
            />
            <CssBaseline />
            <Box sx={{ width: '100%', marginTop: 14}}>
                {
                  !isSearch ? <StepperOrder /> : 
                    <ProductSearch 
                      products={products}
                      handleBuy={handleBuy}
                      handleClickDetail={handleClickDetail}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      navigate={navigate}
                      isAdmin={localStorage.getItem("isAdmin")}
                      handleOk={handleOk}
                      handleCloseDialog={handleCloseDialog}
                      openDialog={openDialog}
                    />
                }
            </Box>
        </Container>
    )
}