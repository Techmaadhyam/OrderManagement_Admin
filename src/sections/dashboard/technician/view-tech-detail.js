import PropTypes from 'prop-types';

import {
  Card,
  CardHeader,
  Divider,
  Typography,
  Link,
  SvgIcon,
} from '@mui/material';

import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { primaryColor } from 'src/primaryColor';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import IconWithPopup from '../user/user-icon';
import { useLocation } from 'react-router-dom';
import Logo from '../logo/logo';



export const ViewTechnicianDetail = (props) => {

  const location = useLocation();
  const state = location.state;


  const align = 'horizontal' 
  

  return (
    <div style={{ minWidth: "100%", marginTop: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.services.technicianview}
            sx={{
              alignItems: "center",
              display: "inline-flex",
            }}
            underline="none"
          >
            <SvgIcon
              sx={{
                mr: 1,
                width: 38,
                height: 38,
                transition: "color 0.5s",
                "&:hover": { color: `${primaryColor}` },
              }}
            >
              <ArrowCircleLeftOutlinedIcon />
            </SvgIcon>
            <Typography variant="subtitle2">
              Back To{" "}
              <span style={{ color: `${primaryColor}`, fontWeight: 600 }}>
                TechMaadhyam Resource List
              </span>
            </Typography>
          </Link>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <IconWithPopup />
        </div>
      </div>
      <h2>TechMaadhyam Resource</h2>
      <Card style={{ marginBottom: "12px" }}>
        <CardHeader title="TechMaadhyam Resource Detail" />
        <PropertyList>
          <PropertyListItem align={align} label="Name">
            <Typography variant="subtitle2">{state?.userName}</Typography>
          </PropertyListItem>
          <Divider />
          <PropertyListItem
            align={align}
            label="Email"
            value={state?.emailId}
          />
          <Divider />
          <PropertyListItem align={align} label="Type" value={state?.type} />
          <Divider />
          <PropertyListItem
            align={align}
            label="Company"
            value={state?.companyName}
          />
          <Divider />
          <PropertyListItem
            align={align}
            label="Address"
            value={
              state?.address +
              ", " +
              state?.city +
              ", " +
              state?.state +
              ", " +
              state?.country +
              "-" +
              state?.pincode
            }
          />
        </PropertyList>
        <Divider />
      </Card>
    </div>
  );
};

ViewTechnicianDetail.propTypes = {
  customer: PropTypes.object.isRequired
};