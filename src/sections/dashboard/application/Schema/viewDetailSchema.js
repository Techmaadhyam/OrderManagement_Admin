import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  Divider,
  Typography,
  Link,
  SvgIcon,
} from "@mui/material";

import { PropertyList } from "src/components/property-list";
import { PropertyListItem } from "src/components/property-list-item";
import { RouterLink } from "src/components/router-link";
import { paths } from "src/paths";
import { primaryColor } from "src/primaryColor";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useLocation } from "react-router-dom";
import User from "../../user/user-icon";
import Logo from "../../logo/logo";

export const ViewSchemaDetail = (props) => {
  const location = useLocation();
  const state = location.state;

  const align = "horizontal";

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
            href={paths.dashboard.application.schemaView}
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
                Schema List
              </span>
            </Typography>
          </Link>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <Logo />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <User />
        </div>
      </div>
      <h2>Schama Details</h2>
      <Card style={{ marginBottom: "12px" }}>
        <PropertyList>
          <PropertyListItem align={align} label="Company Name">
            <Typography variant="subtitle2">{state?.company?.name}</Typography>
          </PropertyListItem>
          <Divider />
          <PropertyListItem
            align={align}
            label="Profile"
            value={state?.profile?.name}
          />
          <Divider />

          <PropertyListItem
            align={align}
            label="Tab"
            value={state?.appobject?.tablelabel}
          />
          <Divider />

          <PropertyListItem
            align={align}
            label="Description"
            value={state?.objectfield?.fieldname}
          />
          <Divider />
        </PropertyList>
        <Divider />
      </Card>
    </div>
  );
};

ViewSchemaDetail.propTypes = {
  customer: PropTypes.object.isRequired,
};
