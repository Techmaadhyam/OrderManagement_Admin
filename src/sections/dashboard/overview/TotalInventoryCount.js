import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography, Tooltip } from '@mui/material';
import ShoppingBag03Icon from 'src/icons/untitled-ui/duocolor/shopping-bag-03';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


export const TotalInventoryCount = (props) => {
  const { amount } = props;

  return (
    <Card

    >
      
      <Stack
        alignItems="center"
        direction={{
          xs: 'column',
          sm: 'row'
        }}
        spacing={3}
        sx={{
          px: 4,
          py: 3
        }}
        style={{ textDecoration: 'none' }}
        component={RouterLink}
        href={paths.dashboard.inventory.view}
      >
        <div>
        <SvgIcon fontSize="large" color="primary">
                <ShoppingBag03Icon />
        </SvgIcon>
        </div>
        <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography color="text.secondary" variant="body2">
          Total Inventory Count  
        </Typography>
        <Tooltip title="This shows total inventory items. You can view them by clicking this card." arrow>
          <InfoOutlinedIcon color="primary" fontSize='small' sx={{ml:1}} />
        </Tooltip>
      </Box>
      <Typography color="text.primary" variant="h4">
        {amount}
      </Typography>
    </Box>
      </Stack>
   
    </Card>
  );
};

TotalInventoryCount.propTypes = {
  amount: PropTypes.number.isRequired
};
