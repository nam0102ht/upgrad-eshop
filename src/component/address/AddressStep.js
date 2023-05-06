import { Box, Button, Container, TextField, Typography } from '@mui/material'
import * as React from 'react'
import './TextAddress.css'
import Select from 'react-select';

export default function AddressStep(props) {
    
    return (
        <Container>
            <Box display='flex' alignItems='center' flexDirection='column' justifyContent='center'>
                <Typography variant='boy1'>Select Address:</Typography>
                <Select
                    name="address"
                    options={props.optionAddress}
                    onChange={props.handleChangeAddress}
                    className='selectWidth'
                />
            </Box>
            <Box marginTop={5} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                <Box textAlign={'center'}>
                    <Typography variant='h4'>Add address</Typography>
                </Box>
                <Box component={'form'} onSubmit={props.handleSubmit} width={'45%'} display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="name"
                        label="Name"
                        id="name"
                        autoComplete="name"
                        className='textAddress'
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="contactNumber"
                        label="Contact Number"
                        id="contactNumber"
                        autoComplete="contactNumber"
                        className='textAddress'
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="street"
                        label="Street"
                        id="street"
                        autoComplete="street"
                        className='textAddress'
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="city"
                        label="City"
                        id="city"
                        autoComplete="city"
                        className='textAddress'
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="state"
                        label="State"
                        id="state"
                        autoComplete="state"
                        className='textAddress'
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="landmark"
                        label="Landmark"
                        id="landmark"
                        autoComplete="landmark"
                        className='textAddress'
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="zipCode"
                        label="Zip Code"
                        id="zipCode"
                        autoComplete="zipCode"
                        className='textAddress'
                    />
                    <Button type='submit' variant='contained' style={{ width: '100%'}} >Save Address</Button>
                </Box>
            </Box>

        </Container>
    )
}