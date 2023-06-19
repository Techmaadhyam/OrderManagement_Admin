import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import ShoppingBag03Icon from 'src/icons/untitled-ui/duocolor/shopping-bag-03';

export const TotalInventoryCount = (props) => {
  const { amount } = props;

  return (
    <Card>
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
      >
        <div>
        <SvgIcon fontSize="large">
                <ShoppingBag03Icon />
        </SvgIcon>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Total Inventory Count
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
          >
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
