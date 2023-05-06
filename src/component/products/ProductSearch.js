import { Box, Grid } from '@mui/material'
import * as React from 'react'
import ProductCard from '../cards/ProductCard'

export default function ProductSearch(props ) {

    return (
        <Box
          sx={{
              marginTop: 5,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
          }}>
            <Grid container spacing={3} justifyContent={'center'}>
            {
              props.products.map(v => {
                return <Grid item xs={4} key={v.id}>
                  <ProductCard 
                      image={v.imageUrl}
                      title={v.name}
                      id={v.id}
                      name={v.name}
                      prices={v.price}
                      description={v.description}
                      handleBuy={(event) => props.handleBuy(event, v)}
                      handleEdit={event => props.handleEdit(event, v)}
                      handleDelete={event => props.handleDelete(event, v)}
                      isAdmin={props.isAdmin}
                      handleOnClick={event => props.handleClickDetail(event, v)}
                      handleCloseDialog={props.handleCloseDialog}
                      handleOk={props.handleOk}
                      openDialog={props.openDialog}
                    />
              </Grid>
              })
            }
            </Grid>
          </Box>
    )
}