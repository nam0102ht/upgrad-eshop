import * as React from 'react';
import AddProductForm from '../form/AddProductForm';
import { Box, Container, Snackbar } from '@mui/material';
import { deleteProduct, getCategory, getProductDetail, getProducts, updateProduct } from '../../services/handleProducts';
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';
import { Alert } from '../form/Helper';
import ProductSearch from './ProductSearch';
import { useNavigate, useParams } from 'react-router-dom';
import { findAllAddress } from '../../services/handleAddress';


export default function ModifyProduct(props) {
    const navigate = useNavigate()
    const param = useParams()
    const [message, setMessage] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [severity, setSeverity] = React.useState("success")
    const [isSearch, setIsSearch] = React.useState(false)
    const [categories, setCategories] = React.useState([{ value: "", label: ""}])
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
        "name": "",
        "category": "",
        "price": 0,
        "description": "",
        "manufacturer": "",
        "availableItems": 0,
        "imageUrl": ""
    })

    const fetchData = React.useCallback(() => {
        const func = async () => {
            let res = await getProductDetail(param.productId)
            localStorage.setItem('product', JSON.stringify(res))
            setProduct(res)
            let cates = await getCategory()
            setCategories(cates)
            let cate = cates.find(v => {
                return res.category === v.value
            })
            setCategory(cate)
        }
        func()
    }, [param])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])

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

      const res = await updateProduct(product.id, newData)
      if (res.state) {
        setOpen(true)
        let mess = `${newData.name} ${res.message}`
        setMessage(mess)
        setSeverity('success')
      } else {
        setOpen(true)
        let mess = `${res.message}`
        setMessage(mess)
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
  
      const handleClose = async (event) => {
        event.preventDefault();
        setOpen(false)
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

    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setProduct(values => ({...values, [name]: value}))
    }

    const onChangeSelect = (data) => {
        setCategory(data)
    }

    return (
        <Container component="main">
            <PrimarySearchAppBar
                handleOnChange={handleSearch}
            />
            <Box sx={{
                marginTop: 14,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
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
                {
                    !isSearch ? 
                    <AddProductForm 
                        categories={categories}
                        category={category}
                        handleSubmit={handleSubmit}
                        buttonName='Modify Product'
                        product={product}
                        title='Modify Product'
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
                    />
                }
            </Box>
        </Container>
    )
}