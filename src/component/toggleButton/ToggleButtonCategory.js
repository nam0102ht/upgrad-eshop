import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { getCategory } from '../../services/handleProducts';

export default function ToggleButtonCategory(props) {
    const [categories, setCategories] = React.useState([])

    React.useEffect(() => {
        let cate = getCategory()
        cate.then(res => {
          setCategories(res)
        })
      }, [])


    return (
        <ToggleButtonGroup
            value={props.category}
            exclusive
            onChange={props.handleCategory}
            aria-label="text"
        >
            <ToggleButton value="all" aria-label="all">
                ALL
            </ToggleButton>
            {
                categories.map(v => {
                    return <ToggleButton key={v.label} value={v.value} aria-label={v.label}>
                            {v.label}
                    </ToggleButton>
                })
            }
        </ToggleButtonGroup>
    );
}