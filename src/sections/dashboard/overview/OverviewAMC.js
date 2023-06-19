import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Typography
} from '@mui/material';
import { customLocale } from 'src/utils/date-locale';

export const OverviewAMC = (props) => {
  const { messages } = props;

  return (
    <Card>
    <CardHeader
      title="AMC List"
      action={(
        <IconButton color="inherit">
          <SvgIcon fontSize="small">
            <RefreshCcw01Icon />
          </SvgIcon>
        </IconButton>
      )}
    />
    <List disablePadding>
    {messages?.map((message) => {

        return (
          <ListItem
            key={message.id}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
                cursor: 'pointer'
              }
            }}
          >
            <ListItemAvatar>
            {message?.category === 'poList' ? (

              <Avatar>
                <ShoppingCart01Icon />
              </Avatar>

          ) : (
            <Avatar>
              <InventoryTwoToneIcon />
            </Avatar>
          )}
        </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={(
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  variant="subtitle2"
                >
                  {message?.companyName}
                </Typography>
              )}
              secondary={(
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  variant="body2"
                >
                  {message?.contactPersonName}
                </Typography>
              )}
              sx={{ pr: 2 }}
            />
            <Typography
              color="text.secondary"
              sx={{ whiteSpace: 'nowrap' }}
              variant="caption"
            >
     
            </Typography>
          </ListItem>
        );
      })}
    </List>

  </Card>
  );
};

OverviewAMC.propTypes = {
  messages: PropTypes.array.isRequired
};
