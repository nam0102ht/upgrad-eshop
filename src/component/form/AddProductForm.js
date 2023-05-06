import { Box, Button, TextField, Typography } from '@mui/material';
import * as React from 'react';
import "../products/Products.css"
import { CreatableSelectCustomize } from './Helper';

export default function AddProductForm(props) {
    return (
      <Box width={'100%'} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography variant='h5'>
          {props.title}
        </Typography>
        <Box component='form'
              onSubmit={props.handleSubmit}
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
              className='formAddProduct'
          >
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={props.product.name}
                  onChange={props.handleOnChange}
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <CreatableSelectCustomize 
                  isClearable
                  styles={{
                    // Fixes the overlapping problem of the component
                    menu: provided => ({ ...provided, zIndex: 9999 })
                  }}
                  value={props.category}
                  options={props.categories}
                  onChange={props.handleOnChangeSelect}
                  name='category'
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="manufacturer"
                  label="Manufacturer"
                  name="manufacturer"
                  onChange={props.handleOnChange}
                  value={props.product.manufacturer}
                  autoComplete="manufacturer"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="availableItems"
                  label="Available Item"
                  name="availableItems"
                  autoComplete="availableItems"
                  onChange={props.handleOnChange}
                  value={props.product.availableItems}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="Price"
                  label="Price"
                  name="price"
                  autoComplete="price"
                  onChange={props.handleOnChange}
                  value={props.product.price}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="imageUrl"
                  label="Image Url"
                  name="imageUrl"
                  onChange={props.handleOnChange}
                  value={props.product.imageUrl}
                  autoComplete="imageUrl"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  onChange={props.handleOnChange}
                  fullWidth
                  id="description"
                  label="Description"
                  value={props.product.description}
                  name="description"
                  autoComplete="description"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {props.buttonName}
                </Button>
          </Box>
        </Box>
    )
}