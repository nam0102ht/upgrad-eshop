import * as React from 'react'
import { getProductDetail } from '../../services/handleProducts';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';


export default function OrderProduct() {
    const [order, setOrder] = React.useState({quantity: 1, user: "", product: ""})
    const [product, setProduct] = React.useState(localStorage.getItem('productDetail'))

    React.useEffect(() => {
      let orderArr = JSON.parse(localStorage.getItem("orders"))
      let order1 = orderArr[0]
      setOrder(order1)

      let productDetail = getProductDetail(order1.product)
      productDetail.then(v => {
        setProduct(v)
      })
    }, [])

    return (
        <Container component="main">
            <CssBaseline />
            <Box component='div'
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
              <Grid
                container
                spacing={2}
              >
                <Grid item xs={4} maxHeight={'25em'}>
                  <img src={product.imageUrl} width={'100%'} height={'100%'} style={{ objectFit: 'cover' }} alt="#" />
                </Grid>
                <Grid item xs={8}>
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
                          { Number.parseFloat(product.price) * Number.parseFloat(order.quantity)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> 
            </Box>
        </Container>
    )
}