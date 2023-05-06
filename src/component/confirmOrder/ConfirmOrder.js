import { Box, Container, Grid, Typography } from '@mui/material'
import * as React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getProductDetail } from '../../services/handleProducts';
import { findAddress } from '../../services/handleAddress';

export default function ConfirmOrder() {
    const [order, setOrder] = React.useState({quantity: 1, user: "", product: ""})
    const [product, setProduct] = React.useState(localStorage.getItem('productDetail'))
    const [address, setAddress] = React.useState(localStorage.getItem('productDetail'))

    React.useEffect(() => {
      let orderArr = JSON.parse(localStorage.getItem("orders"))
      let order1 = orderArr[0]
      setOrder(order1)

      let productDetail = getProductDetail(order1.product)
      productDetail.then(v => {
        setProduct(v)
      })

      let addressDetail = findAddress(order1.address)
      addressDetail.then(v => {
        setAddress(v.data)
      })

    }, [])


    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={7} boxShadow={1}>
                    <Grid container spacing={2} margin={'16px'}>
                        <Grid>
                            <Typography
                            variant="h4"
                            marginLeft={3}
                            marginRight={3}
                            >
                            {product.name}
                            </Typography>
                        </Grid>
                        <Grid />
                    </Grid>
                    <Grid container spacing={1} margin={'16px'}>
                    <Grid>
                            <Typography 
                                variant="p"
                                marginLeft={3}
                                marginRight={3}
                                >
                                Quantility: <b>{order.quantity}</b>
                                </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} margin={'16px'}>
                        <Grid>
                            <Typography 
                                variant="p"
                                marginLeft={3}
                                marginRight={3}
                                >
                                Category: <b>{product.category}</b>
                                </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} margin={'16px'}>
                        <Grid>
                            <Typography 
                                variant="body1"
                                marginLeft={3}
                                marginRight={3}
                                mt={2}
                                gutterBottom
                                fontStyle={'italic'}
                                >
                                {product.description}
                                </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} margin={'16px'}>
                        <Grid container spacing={3} paddingLeft={'24px'} color={'red'}>
                            <Grid item>
                                <Typography 
                                    variant="h4"
                                    marginRight={3}
                                    mt={2}
                                    gutterBottom
                                    marginLeft={0}
                                >
                                    Total Price: 
                                </Typography>
                            </Grid>
                        <Grid item width={'55px'}>
                            <CurrencyRupeeIcon variant="h5" style={{
                                width: '100%',
                                height: '100%'
                            }} />
                        </Grid>
                        <Grid item>
                            <Typography 
                            variant="h4"
                            marginRight={3}
                            mt={2}
                            gutterBottom
                            marginLeft={0}
                            >
                            {Number.parseFloat(product.price) * order.quantity}
                            </Typography>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={5} boxShadow={1}>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography variant="h4"
                            marginLeft={3}
                            marginRight={3}
                            gutterBottom
                            >
                            Address Details:
                            </Typography>
                        <Typography variant="body1"
                            marginLeft={3}
                            marginRight={3}
                            gutterBottom
                            >
                            {address.name}
                        </Typography>
                        <Typography variant="body1"
                            marginLeft={3}
                            marginRight={3}
                            gutterBottom
                            >
                            Contact Number: {address.contactNumber}
                        </Typography>
                        <Typography variant="body1"
                            marginLeft={3}
                            marginRight={3}
                            gutterBottom
                            >
                            {address.street + " " + address.city}
                        </Typography>
                        <Typography variant="body1"
                            marginLeft={3}
                            marginRight={3}
                            gutterBottom
                            >
                            {address.state}
                        </Typography>
                        <Typography variant="body1"
                            marginLeft={3}
                            marginRight={3}
                            gutterBottom
                            >
                            {address.zipcode}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}