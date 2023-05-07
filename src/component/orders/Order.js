import { Box, Container, CssBaseline, Snackbar } from '@mui/material'
import * as React from 'react'
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar'
import { getProducts } from '../../services/handleProducts';
import StepperOrder from './Stepper';
import ProductSearch from '../products/ProductSearch';
import { useNavigate } from 'react-router-dom';
import { Alert, handleBuyHelper, handleDeleteOk, handleSearchHelper } from '../form/Helper';

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
    const isAdmin = sessionStorage.getItem('isAdmin')
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
      handleSearchHelper(data, setIsSearch, setProducts)
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
      handleBuyHelper(event, product, setOpen, setMessage, setSeverity, navigate)
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
      handleDeleteOk(event, productDelete, setProducts, setOpen, setMessage, setSeverity, setOpenDialog)
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
                      isAdmin={isAdmin}
                      handleOk={handleOk}
                      handleCloseDialog={handleCloseDialog}
                      openDialog={openDialog}
                    />
                }
            </Box>
        </Container>
    )
}