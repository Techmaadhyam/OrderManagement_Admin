import PropTypes from "prop-types";
import { formatDistanceStrict } from "date-fns";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import RefreshCcw01Icon from "@untitled-ui/icons-react/build/esm/RefreshCcw01";
import ShoppingCart01Icon from "src/icons/untitled-ui/duocolor/shopping-cart-01";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
import SearchIcon from "@mui/icons-material/Search";
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
  MenuItem,
  Pagination,
} from "@mui/material";
import { customLocale } from "src/utils/date-locale";
import React, { useState, useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";

const customerType = [
  {
    label: "Purchase",
    value: "poList",
  },
  {
    label: "Sales",
    value: "soList",
  },
];

const countPerPage = 4;

export const OverviewTask = (props) => {
  const navigate = useNavigate();

  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [type, setType] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages

  const { messages } = props;

  const dataWithKeys = messages?.map((item) => ({
    ...item,
    companyName: item.tempUser?.companyName || item.companyuser?.companyName,
    key: item.id,
  }));

  const filteredMessages = dataWithKeys?.filter((message) =>
    message?.companyName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredType = type
    ? filteredMessages?.filter((message) => message?.category === type)
    : filteredMessages;

  //company search
  const handleCompanyClick = () => {
    setIsSearching(true);
  };

  const handleCompanyInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCompanyCancel = () => {
    setIsSearching(false);
    setSearchText("");
  };

  const handleInputChange = (event) => {
    setType(event.target.value);
  };

  const getStatusAvatarStyle = (status) => {
    let backgroundColor;
    let color;

    switch (status) {
      case "Approved":
        backgroundColor = "#dbf0aa";
        color = "#919e05";
        break;
      case "Draft":
        backgroundColor = "#ffeab0";
        color = "#ED8B00";
        break;
      case "Delivered":
        backgroundColor = "#c9ffb0";
        color = "#06b004";
        break;
      case "Waiting for Approval":
        backgroundColor = "#e1e3e1";
        color = "#99a399";
        break;
      case "Cancelled":
        backgroundColor = "#ffd4d4";
        color = "#ff1919";
        break;
      default:
        backgroundColor = "";
    }

    return {
      color: color,
      backgroundColor: backgroundColor,
    };
  };

  const totalPages = Math.ceil(filteredType.length / countPerPage);

  const startIndex = (currentPage - 1) * countPerPage;
  const endIndex = startIndex + countPerPage;
  const currentMessages = filteredType.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  function formatDate(dateString) {
    const parsedDate = new Date(dateString);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  }

  const handleNavigate = (messages) => {
    const formattedMessages = {
      ...messages,
      deliveryDate: formatDate(messages.deliveryDate),
    };

    if (messages?.category === "poList") {
      navigate(`/dashboard/purchaseorder/viewDetail/${messages.id}`, {
        state: formattedMessages,
      });
    } else {
      navigate(`/dashboard/orders/viewDetail/${messages.id}`, {
        state: formattedMessages,
      });
    }
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
        action={
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
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        }
      />
      <Divider />
      <List disablePadding>
        {currentMessages?.map((message) => {
          return (
            <ListItem
              key={message.id}
              onClick={() => handleNavigate(message)}
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                  cursor: "pointer",
                },
              }}
            >
              <ListItemAvatar>
                {message?.category === "poList" ? (
                  <Avatar style={getStatusAvatarStyle(message?.status)}>
                    <ShoppingCart01Icon />
                  </Avatar>
                ) : (
                  <Avatar style={getStatusAvatarStyle(message?.status)}>
                    <InventoryTwoToneIcon />
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    variant="subtitle2"
                  >
                    {message?.companyName}
                  </Typography>
                }
                secondary={
                  <Typography
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    variant="body2"
                  >
                    {message?.contactPerson}
                  </Typography>
                }
                sx={{ pr: 2 }}
              />
              <Typography
                color="text.secondary"
                sx={{ whiteSpace: "nowrap" }}
                variant="caption"
              >
                {message?.status}
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
        sx={{ mt: 2, mb: 2, justifyContent: "center" }}
      />
    </Card>
  );
};

OverviewTask.propTypes = {
  messages: PropTypes.array.isRequired,
};
