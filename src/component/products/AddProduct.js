import { Box, Container, Snackbar } from '@mui/material';
import * as React from 'react';
import "./Products.css"
import { addProduct, deleteProduct, getCategory, getProducts } from '../../services/handleProducts';
import AddProductForm from '../form/AddProductForm';
import { Alert } from '../form/Helper';
import { useNavigate } from 'react-router-dom';
import { findAllAddress } from '../../services/handleAddress';
import ProductSearch from './ProductSearch';
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';

export default function AddProduct(props) {
    const navigate = useNavigate()
    const [isSearch, setIsSearch] = React.useState(false)
    const [message, setMessage] = React.useState("")
    const [openDialog, setOpenDialog] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [severity, setSeverity] = React.useState("success")
    const [categories, setCategories] = React.useState([])
    const [category, setCategory] = React.useState({ value: "", label: ""})
    const [products, setProducts] = React.useState([{
          "name": "",
          "category": "",
          "price": 0,
          "description": "",
          "manufacturer": "",
          "availableItems": 0,
          "imageUrl": ""
    }])
    const [product, setProduct] = React.useState({
      "id": "",
      "name": "",
      "category": "",
      "price": 0,
      "description": "",
      "manufacturer": "",
      "availableItems": 0,
      "imageUrl": ""
    })
    const [productDelete, setProductDelete] = React.useState({
      "name": "",
      "category": "",
      "price": 0,
      "description": "",
      "manufacturer": "",
      "availableItems": 0,
      "imageUrl": ""
    })

    React.useEffect(() => {
      let cate = getCategory()
      cate.then(res => {
        setCategories(res)
      })
    }, [])

    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var newData = {
        name: data.get('name'),
        category: data.get('category'),
        manufacturer: data.get('manufacturer'),
        availableItems: data.get('availableItems'),
        imageUrl: data.get('imageUrl'),
        price: data.get('price'),
        description: data.get('description')
      }

      const res = await addProduct(newData)
      if (res.state) {
        setOpen(true)
        setMessage(`Product ${newData.name} added successfully`)
        setSeverity('success')
      } else {
        setOpen(true)
        setMessage(`Product ${newData.name} added failed`)
        setSeverity('error')
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
            localStorage.setItem("address", JSON.stringify(v.data))
          }
          let order = {
            quantity: 1,
            user: user.id,
            product: product.id
          }
          let arrOrder = JSON.stringify([order])
          localStorage.setItem('orders', arrOrder)
          navigate(`/order`)
  
        }
      })
    }
  
    const handleDelete = async (event, product) => {
      event.preventDefault();
      setOpenDialog(true)
      setProductDelete(product)
    }

    const handleClose = async (event) => {
      event.preventDefault();
      setOpen(false)
    }

    const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value
      setProduct(values => ({...values, [name]: value}))
  }


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

  const onChangeSelect = (data) => {
      setCategory(data)
  }

  const handleOk = async (event) => {
    event.preventDefault();
    let res = await deleteProduct(productDelete)
    if (res.state) {
      setOpen(true)
      setMessage(`${productDelete.name} deleted successfully`)
      setSeverity('success')
      let prods = getProducts();
      prods.then(v => {
        setProducts(v)
      })
      setOpenDialog(false)
    } else {
      setOpen(true)
      setMessage(`Product ${productDelete.name} deleted failed!`)
      setSeverity('error')
      setOpenDialog(false)
    }
  }

  const handleCloseDialog = (event) => {
    event.preventDefault();
    setOpenDialog(false)
  }


  return (
    <Container component={'main'}>
      <PrimarySearchAppBar
        handleOnChange={handleSearch}
      />
      <Box component='div'
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
      >
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
        {
          !isSearch ? 
          <AddProductForm 
            categories={categories}
            handleSubmit={handleSubmit}
            buttonName='Save Product'
            title='Add Product'
            product={product}
            category={category}
            handleOnChange={onChange}
            handleOnChangeSelect={onChangeSelect}
          /> : <ProductSearch 
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