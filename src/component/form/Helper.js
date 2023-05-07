import styled from '@emotion/styled';
import { Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react'
import { Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import validator from 'validator';
import { deleteProduct, getProducts } from '../../services/handleProducts';

export const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CreatableSelectCustomize = styled(CreatableSelect) (( {theme}) => ({
    width: '100%'
  }));

export function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          upGrad
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export function SnackbarCustom(props) {
  return (
    <Snackbar open={props.open} key={'topRight'} anchorOrigin={{ vertical: 'top', horizontal: "right" }} autoHideDuration={6000} onClose={props.handleClose}>
      <Alert severity={props.severity} onClose={props.handleClose} sx={{ width: '100%' }}>
        {props.message}
      </Alert>
    </Snackbar>
  )
}

export const validateProduct = (name, value, newErrors, setErrors) => {
  let error = '';
  if(!value) {
      error = 'Value required!'
  } else {
      switch(name) {
          case 'name':
            if(value === null || validator.isEmpty(value)) {
                error = 'Please enter a proper Name Product'
            }
            break;
          case 'category':
            if(value === null || validator.isEmpty(value)) {
                error = 'Please enter a proper Category'
            }
            break;
          case 'manufacturer':
            if(value === null || validator.isEmpty(value)) {
                error = 'Please enter a strong Manufacturer'
            }
            break;
          case 'availableItems':
            if(!validator.isNumeric(value)) {
                error = 'Please enter a strong AvailableItems'
            }
            break;
          case 'imageUrl':
            if(validator.isEmpty(value)) {
                error = 'Please enter a proper ImageUrl'
            }
            break;
          case 'price':
            if(!validator.isNumeric(value)) {
                error = 'Please enter a proper Price'
            }
            break;
          default:
            setErrors('Error')
      }
  }
  if(error === '') {
      delete newErrors[name]
  } else {
      newErrors[name] = error;
  }
  return newErrors;
}

export const validateAddress = (name, value, newErrors, setErrors) => {
  let error = '';
  if(!value) {
      error = 'Value required!'
  } else {
      switch(name) {
          case 'name':
            if(value === null || validator.isEmpty(value)) {
                error = 'Please enter a proper Name Adress'
            }
            break;
          case 'contactNumber':
            if(value === null || !validator.isNumeric(value)) {
                error = 'Please enter a proper ContactNumber'
            }
            break;
          case 'street':
            if(value === null || validator.isEmpty(value)) {
                error = 'Please enter a strong Street'
            }
            break;
          case 'city':
            if(validator.isEmpty(value)) {
                error = 'Please enter a strong City'
            }
            break;
          case 'state':
            if(validator.isEmpty(value)) {
                error = 'Please enter a proper state'
            }
            break;
          case 'zipCode':
            if(!validator.isNumeric(value)) {
                error = 'Please enter a proper zipCode'
            }
            break;
          default:
            break;
      }
  }
  if(error === '') {
      delete newErrors[name]
  } else {
      newErrors[name] = error;
  }
  return newErrors;
}

export const mapNewKeysProduct = (newErrors) => {
  return Object.keys(newErrors).map(v => {
    switch (v) {
      case 'name':
        return 'Name'
      case 'category':
        return 'Category'
      case 'manufacturer':
        return 'Manufacturer'
      case 'imageUrl':
        return 'ImageUrl'
      case 'price':
        return 'Price'
      default:
        return ''
    }
  })
}

export const mapNewKeysAddress = (newErrors) => {
  return Object.keys(newErrors).map(v => {
    switch (v) {
      case 'name':
        return 'Name'
      case 'contactNumber':
        return 'Contact Number'
      case 'street':
        return 'Street'
      case 'city':
        return 'City'
      case 'state':
        return 'State'
      case 'zipCode':
        return 'Zip Code'
      default:
        return ''
    }
  })
}

export const handleBuyHelper = (event, product, setOpen, setMessage, setSeverity, navigate) => {
  event.preventDefault();
  let user = JSON.parse(sessionStorage.getItem('user'))

  if (user === null) {
    setOpen(true)
    setMessage('Please login to continue')
    setSeverity('error')
    return
  }
  
  navigate(`/products/detail/${product.id}`)
}

export const handleCategoryHelperToggle = (event, newCategory, setProducts, setIsSearch, setCategory) => {
  event.preventDefault();
  setCategory(newCategory);
  if (newCategory === 'all') {
    let prods = getProducts();
    prods.then(v => {
      setProducts(v)
    })
  } else {
    if (newCategory === null || newCategory === '') {
      setIsSearch(false)
    } else {
      setIsSearch(true)
    }
    let prods = getProducts();
    prods.then(k => {
      let h = k.filter(v => {
        return v.category === newCategory
      })
      setProducts(h)
    })
  }
}

export const handleCategoryHelper = (event, newCategory, setProducts, setCategory) => {
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
}

export const handleSearchHelper = (data, setIsSearch, setProducts) => {
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

export const handleSearchWithoutIsSearchHelper = (data, setProducts) => {
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

export const handleDeleteHelper = async (event, setOpenDialog) => {
  event.preventDefault();
  setOpenDialog(true)
}

export const handleDeleteOk = async (event, productDelete, setProducts, setOpen, setMessage, setSeverity, setOpenDialog) => {
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