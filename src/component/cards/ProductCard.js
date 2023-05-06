import * as React from 'react';
import './Cards.css'
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../dialog/ConfirmDialog';

const ButtonBuy = styled(Button) (( {theme}) => ({
    backgroundColor: '#3f51b5',
    color: "white"
  }));

const ButtonIcon = styled(Button) (( {theme}) => ({
  }));


export default function ProductCard(props) {

    return (
        <div>
        <ConfirmDialog
            open={props.openDialog}
            handleOk={props.handleOk}
            handleClose={props.handleCloseDialog}
        />
        <Card itemID={props.id} key={props.id}>
            <CardMedia
                sx={{ height: 200 }}
                image={props.image}
                
                title={props.title}
                id={props.id}
                key={props.id}
            />
            <CardContent className='contentScrollY'>
                <Typography gutterBottom variant="p" component="div" onClick={props.handleOnClick} style={{
                    cursor: 'pointer'
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8} md={8}>
                            {props.name}
                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <CurrencyRupeeIcon variant="h5" className='widthheight' />
                                </Grid>
                                <Grid item xs={8} className='pricesClass'>
                                    {props.prices}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Typography>
                <Box component={'div'}>
                    <Typography variant="body2" color="text.secondary">
                        {
                            props.description === null || props.description === "" ?  "N/A" : props.description
                        }
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ButtonBuy className='buttonHover' onClick={props.handleBuy} size="small">Buy</ButtonBuy>
                </Grid>
                <Grid item xs={6}>
                    {
                        props.isAdmin  === 'ADMIN' ? 
                        <Grid container spacing={2}>
                            <Grid item xs={4} />
                            <Grid item xs={3}>
                                <ButtonIcon className='buttonHover' onClick={props.handleEdit} size="small">
                                    <CreateIcon />
                                </ButtonIcon>
                            </Grid>
                            <Grid item xs={3}>
                                <ButtonIcon className='buttonHover' onClick={props.handleDelete} size="small">
                                    <DeleteIcon />
                                </ButtonIcon>
                            </Grid>
                        </Grid>
                        : <></>
                    }
                </Grid>
            </Grid> 
            </CardActions>
        </Card>
        </div>
    )
}