import PropTypes from 'prop-types';
import { formatDistanceStrict } from 'date-fns';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import RefreshCcw01Icon from '@untitled-ui/icons-react/build/esm/RefreshCcw01';
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import PendingActionsTwoToneIcon from '@mui/icons-material/PendingActionsTwoTone';
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
  Icon,
  TextField,
  Pagination
} from '@mui/material';
import { customLocale } from 'src/utils/date-locale';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const countPerPage = 4;

export const OverviewAMC = (props) => {
  const { messages } = props;
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  const sortedMessages = messages?.sort((a, b) => new Date(a.enddate) - new Date(b.enddate));

    const filteredMessages = sortedMessages?.filter(message =>
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

const handleNavigate =(messages) => {
  navigate('/dashboard/services/amcDetail', { state: messages })
};

const getEndDateIconStyle = (enddate) => {
  const timeDifference = new Date(enddate) - new Date();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference <= 5) {
    return {  backgroundColor: '#ffd4d4', color: '#ff1919' };
  } else if (daysDifference <= 10) {
    return {  backgroundColor: '#ffeab0', color: '#ED8B00' };
  } else {
    return {  backgroundColor: '#c9ffb0', color: '#06b004' };
  }
};


const totalPages = Math.ceil(filteredMessages.length / countPerPage);

const startIndex = (currentPage - 1) * countPerPage;
const endIndex = startIndex + countPerPage;
const currentMessages = filteredMessages.slice(startIndex, endIndex);

const handlePageChange = (event, page) => {
  setCurrentPage(page);
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
    <Divider/>
        <List disablePadding>

    {currentMessages?.map((message) => {

        return (
          <ListItem
            key={message.id}
            onClick={() => handleNavigate(message)}
            sx={{
              '&:hover': {
                backgroundColor: 'action.hover',
                cursor: 'pointer'
              }
            }}
          >
            <ListItemAvatar>
            {message?.category === 'poList' ? (

              <Avatar style={getEndDateIconStyle(message?.enddate)}>
                <ShoppingCart01Icon />
              </Avatar>

          ) : (
            <Avatar style={getEndDateIconStyle(message?.enddate)}>
              <PendingActionsTwoToneIcon/>
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
    <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        size="small"
        sx={{ mt: 2, mb: 2, justifyContent: 'center' }}
      /> 
  </Card>
  );
};

OverviewAMC.propTypes = {
  messages: PropTypes.array.isRequired
};
