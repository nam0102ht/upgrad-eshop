import * as React from 'react';
import AddProductForm from '../form/AddProductForm';
import { Box, Container, Snackbar } from '@mui/material';
import { getCategory, getProductDetail, updateProduct } from '../../services/handleProducts';
import PrimarySearchAppBar from '../navbar/PrimarySearchAppBar';
import { Alert, handleBuyHelper, handleDeleteHelper, handleDeleteOk, handleSearchHelper, mapNewKeysProduct, validateProduct } from '../form/Helper';
import ProductSearch from './ProductSearch';
import { useNavigate, useParams } from 'react-router-dom';


export default function ModifyProduct(props) {
    const navigate = useNavigate()
    const param = useParams()
    const [message, setMessage] = React.useState("")
    const [open, setOpen] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [severity, setSeverity] = React.useState("success")
    const [errors, setErrors] = React.useState({});
    const [isSearch, setIsSearch] = React.useState(false)
    const isAdmin = sessionStorage.getItem('isAdmin')
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
      const newErrors = {...errors};
      const formData = {};
      for(let [name, value] of data) {
          formData[name] = value;
          validateProduct(name, value, newErrors, setErrors);
      }
      if(Object.keys(newErrors).length !== 0) {
          setErrors(newErrors);
          let mess = ''
          let newKeys = mapNewKeysProduct(newErrors)
          newKeys.forEach(v => {
            mess = `${mess} '${v}'`
          })
          setMessage(`${mess} is empty or not matched with format`)
          setOpen(true)
          setSeverity('error')
          return;
      }
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
        setSeverity('success')
        setMessage(`Product ${newData.name} modified successfully`)
      } else {
        setOpen(true)
        setMessage(`Product ${newData.name} modified failed`)
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
      handleBuyHelper(event, product, setOpen, setMessage, setSeverity, navigate)
    }

    const handleClose = async (event) => {
        event.preventDefault();
        setOpen(false)
    }
    
    const handleDelete = async (event, product) => {
      handleDeleteHelper(event, setOpenDialog)
    }

    const handleSearch = (data) => {
      handleSearchHelper(data, setIsSearch, setProducts)
    }

    const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value
      const newErrors = validateProduct(name, value, {...errors}, setErrors);
      setErrors(newErrors)
      setProduct(values => ({...values, [name]: value}))
    }

    const onChangeSelect = (data) => {
        setCategory(data)
    }

    const handleOk = async (event, product) => {
      handleDeleteOk(event, product, setProducts, setOpen, setMessage, setSeverity, setOpenDialog)
    }

    const handleCloseDialog = (event) => {
      event.preventDefault();
      setOpenDialog(false)
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
                        errors={errors}
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
                    />
                }
            </Box>
        </Container>
    )
}