import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import PaymentsTwoToneIcon from '@mui/icons-material/PaymentsTwoTone';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';

export const TotalPO = (props) => {
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
        <SvgIcon fontSize="large" color="primary">
        <ShoppingCart01Icon />
              </SvgIcon>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            Total Open PO
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

TotalPO.propTypes = {
  amount: PropTypes.number.isRequired
};