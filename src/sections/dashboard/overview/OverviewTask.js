import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import SearchIcon from '@mui/icons-material/Search';
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
  Typography,
  TextField,
  InputBase,
  Icon,
  MenuItem
} from '@mui/material';
import { customLocale } from 'src/utils/date-locale';
import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const customerType = [
  {
    label: 'Purchase',
    value: 'poList'
  },
  {
    label: 'Sales',
    value: 'soList'
  },

];

export const OverviewTask = (props) => {


  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [type, setType] = useState("");

  const { messages } = props;
  const filteredMessages = messages?.filter(message =>
      message?.tempUser.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredType = type ? filteredMessages?.filter(message => message?.category === type) : filteredMessages;

//company search
const handleCompanyClick = () => {
  setIsSearching(true);
};

const handleCompanyInputChange = event => {
  setSearchText(event.target.value);
};

const handleCompanyCancel = () => {
  setIsSearching(false);
  setSearchText('');
};

const handleInputChange = (event) => {
  setType(event.target.value);
};

return (
    <Card>
      <CardHeader
  title={
    <>
        {!isSearching && (
          <>
            Today's Task
            <IconButton onClick={handleCompanyClick}>
              <SearchIcon />
            </IconButton>
          </>
        )}
        {isSearching && (
          <>
            <InputBase
              value={searchText}
              onChange={handleCompanyInputChange}
              placeholder="Search company..."
            />
            <IconButton onClick={handleCompanyCancel}>
              <Icon>
                <HighlightOffIcon />
              </Icon>
            </IconButton>
          </>
        )}
      </>
    }
    
      action={(
        <TextField
        fullWidth
        label="Type"
        name="type"
        value={type}
        select
        onChange={handleInputChange}
        sx={{ width: 150 }}

      >
        {customerType.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))} 
      </TextField>
      )}
    
  />
      <List disablePadding>
      {filteredType?.map((message) => {

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
                    {message?.tempUser.companyName}
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
                    {message?.contactPerson}
                  </Typography>
                )}
                sx={{ pr: 2 }}
              />
              <Typography
                color="text.secondary"
                sx={{ whiteSpace: 'nowrap' }}
                variant="caption"
              >
              {message?.status}
              </Typography>
            </ListItem>
          );
        })}
      </List>

    </Card>
  );
};

OverviewTask.propTypes = {
  messages: PropTypes.array.isRequired
};
