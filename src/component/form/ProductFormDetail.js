import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import * as React from 'react'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

export default function ProductFormDetail(props) {
    return (
        <Box component='form'
              onSubmit={props.handleSubmit}
              sx={{
                marginTop: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
              <Grid
                container
                spacing={2}
              >
                <Grid item xs={4} maxHeight={'25em'}>
                  <img 
                    src={props.product.imageUrl} 
                    srcSet={props.product.imageUrl} 
                    width={'100%'} 
                    height={'100%'} 
                    style={{ objectFit: 'cover' }} 
                    loading="lazy"
                    alt={props.product.name} />
                </Grid>
                <Grid item xs={8}>
                  <Grid container spacing={2} margin={'16px'}>
                      <Grid>
                        <Typography 
                          variant="h4"
                          marginLeft={3}
                          marginRight={3}
                        >
                          {props.product.name}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Button disabled={true} variant="contained" style={{
                          borderRadius: '40px',
                          backgroundColor: '#3f51b5',
                          color: 'white',
                          textTransform: 'none'
                        }}>
                            Available Quantility: {props.product.availableItems}
                        </Button>
                      </Grid>
                  </Grid>
                  <Grid container spacing={1} margin={'16px'}>
                      <Grid>
                        <Typography 
                              variant="p"
                              marginLeft={3}
                              marginRight={3}
                            >
                              Category: <b>{props.product.category}</b>
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
                              {props.product.description}
                            </Typography>
                      </Grid>
                  </Grid>
                  <Grid container spacing={1} margin={'16px'}>
                    <Grid container spacing={2} paddingLeft={'24px'}>
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
                          {props.product.price}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    width={'55%'}
                    marginLeft={3}
                    marginTop={1}
                    paddingLeft={1}
                    paddingTop={0.5}
                  >
                    <TextField 
                      margin="normal"
                      required
                      fullWidth
                      id="quatility"
                      label="Enter Quatility"
                      name="quatility"
                      autoComplete="quatility"
                      autoFocus
                    />
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    marginLeft={3}
                    marginTop={1}
                    paddingLeft={1}
                    paddingTop={0.5}
                    width={'40%'}
                  >
                    <Button 
                      type="submit" 
                      fullWidth
                      variant="contained"
                    >Place Order</Button>
                  </Grid>
                </Grid>
              </Grid> 
            </Box>
    )
}