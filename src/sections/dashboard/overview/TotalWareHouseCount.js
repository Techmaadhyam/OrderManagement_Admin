import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Box, Button, Card, CardActions, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check';

export const TotalWareHouseCount = (props) => {
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
                <ReceiptCheckIcon />
              </SvgIcon>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            color="text.secondary"
            variant="body2"
          >
           Total WareHouse Count
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

TotalWareHouseCount.propTypes = {
  amount: PropTypes.number.isRequired
};
