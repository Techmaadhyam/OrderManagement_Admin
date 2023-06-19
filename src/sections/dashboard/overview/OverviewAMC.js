import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import React, { useState, useEffect } from 'react';
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
  InputBase,
  Icon
} from '@mui/material';
import { customLocale } from 'src/utils/date-locale';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';

export const OverviewAMC = (props) => {
  const { messages } = props;

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');


    const filteredMessages = messages?.filter(message =>
      message?.noncompany.companyName.toLowerCase().includes(searchText.toLowerCase())
    );

    
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

  return (
    <Card>
    <CardHeader
    title={
      <>
          {!isSearching && (
            <>
              AMC List
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
     
    />
        <List disablePadding>

    {filteredMessages?.map((message) => {

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
                  {message?.noncompany.companyName}
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
            {formatDate(message.enddate)}
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
