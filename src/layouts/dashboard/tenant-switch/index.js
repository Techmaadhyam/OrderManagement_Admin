import PropTypes from 'prop-types';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import { Box, IconButton, Stack, SvgIcon, Typography } from '@mui/material';
import { usePopover } from 'src/hooks/use-popover';
import { TenantPopover } from './tenant-popover';

const tenants = ['Devias', 'Acme Corp'];

export const TenantSwitch = (props) => {
  const popover = usePopover();

  return (
    <>
        <Box
        component="img"
        sx={{
          height: 55,
          width: 'auto',

        }}
        alt="Tech Maadhyam logo"
        src='/assets/logos/logo.png'
        />
    </>
  );
};

TenantSwitch.propTypes = {
  sx: PropTypes.object
};
