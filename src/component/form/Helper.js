import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react'
import { Link } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

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