import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Select from 'react-select';


const SelectCustomize = styled(Select) (( {theme}) => ({
    width: '100%'
  }));
  
export default function SortBy(props) {

    const options = [
        { value: 'default', label: 'Default' },
        { value: 'priceHighToLow', label: 'Price: High To Low' },
        { value: 'priceLowToHigh', label: 'Price: Low To High' },
        { value: 'newest', label: 'Newest' }
      ]

    return (
        <Box
        sx={{
            width: '100%'
        }}
        >
            <Typography>
                Sort by:
            </Typography>
            <SelectCustomize
                defaultValue
                options={options}
                onChange={props.handleOnChange}
                name='sortBy'
            />
        </Box>
    )
}