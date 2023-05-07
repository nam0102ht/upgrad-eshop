import { Box, Container, CssBaseline, Snackbar, } from "@mui/material";
import * as React from 'react'
import { getProductDetail } from "../../services/handleProducts";
import PrimarySearchAppBar from "../navbar/PrimarySearchAppBar";
import { useNavigate, useParams } from "react-router-dom";
import { findAllAddress } from "../../services/handleAddress";
import ProductFormDetail from "../form/ProductFormDetail";
import ProductSearch from "./ProductSearch";
import { Alert, handleBuyHelper, handleCategoryHelperToggle, handleDeleteOk, handleSearchHelper } from "../form/Helper";
import ToggleButtonCategory from "../toggleButton/ToggleButtonCategory";
import ConfirmDialog from "../dialog/ConfirmDialog";


export default function Product(props) {
    const [message, setMessage] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const isAdmin = sessionStorage.getItem('isAdmin')
    const [openDialog, setOpenDialog] = React.useState(false)
    const [category, setCategory] = React.useState('all');
    const [severity, setSeverity] = React.useState("success")
    const [productDelete, setProductDelete] = React.useState({
      "name": "",
      "category": "",
      "price": 0,
      "description": "",
      "manufacturer": "",
      "availableItems": 0,
      "imageUrl": ""
    })
    const [products, setProducts] = React.useState([
      {
        "name": "",
        "category": "",
        "price": 0,
        "description": "",
        "manufacturer": "",
        "availableItems": 0,
        "imageUrl": ""
    }
    ])
    const [product, setProduct] = React.useState(sessionStorage.getItem('productDetail'))
    const [isSearch, setIsSearch] = React.useState(false)
    const params = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
      const prod = getProductDetail(params.productId)
      prod.then(v => {
        setProduct(v)
        sessionStorage.setItem('productDetail', v)
      })
    }, [params])

    const handleSearch = (data) => {
        handleSearchHelper(data, setIsSearch, setProducts)
    }

    const handleCategory = (event, newCategory) => {
      handleCategoryHelperToggle(event, newCategory, setProducts, setIsSearch, setCategory)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget)
        let user = JSON.parse(sessionStorage.getItem('user'))
        
        if (user === null) {
          setOpen(true)
          setMessage('Please login to continue')
          setSeverity('error')
          return
        }
    
        let address = findAllAddress()
        address.then(v => {
          if (v.status) {
            if (v.data.length !== 0) {
              sessionStorage.setItem("address", JSON.stringify(v.data))
            }
            let order = {
              quantity: Number.parseInt(data.get('quatility')),
              user: user.id,
              product: product.id
            }
            let arrOrder = JSON.stringify([order])
            sessionStorage.setItem('orders', arrOrder)
            navigate(`/order`)
        }
      })
    }

    const handleClickDetail = (event, product) => {
      event.preventDefault();
      sessionStorage.setItem("productDetail", product)
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
    

    return(
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
            <ConfirmDialog
              open={openDialog}
              handleOk={handleOk}
              handleClose={handleCloseDialog}
            />
            <Box sx={{
                marginTop: 13,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <Box sx={{
                    marginTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <ToggleButtonCategory 
                      category={category}
                      handleCategory={handleCategory}
                    />
                </Box>
                {!isSearch ?
                <ProductFormDetail 
                  product={product}
                  handleSubmit={handleSubmit}
                /> : <ProductSearch
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
                    />}
            </Box>
        </Container>
    )
}