import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Card,
  CardHeader,
  Typography,
} from '@mui/material';

import { socialApi } from 'src/api/social';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';




const useProfile = () => {

  const isMounted = useMounted();
  const [profile, setProfile] = useState(null);

  const handleProfileGet = useCallback(async () => {
    try {
      const response = await socialApi.getProfile();

      if (isMounted()) {
        setProfile(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      handleProfileGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return profile;
};


export const Page = () => {
  const profile = useProfile();


  const location = useLocation();
  const state = location.state;
console.log(state)

  usePageView();



  if (!profile) {
    return null;
  }

  const data={
    firstName: 'Max',
    lastName: 'Ray',
    email: 'maxray@xyz.com',
    phone: '858383893',
    username: 'max',
    company: 'abc',
    type: 'Stell',
    address: 'abc 3-street, Hyderabad, India',
    zipCode: '572927',

  }
//logout
const handleLogout = () => {
  // Clear the session storage
  sessionStorage.clear();
  localStorage.removeItem('accessToken');
  const broadcastChannel = new BroadcastChannel('logoutChannel');
  broadcastChannel.postMessage('logout');
  window.location.href = paths.index;
};

  const align = 'horizontal' 

  return (
    <>
      <Seo title="Dashboard: Social Profile" />

        <Card style={{marginBottom: "12px" }}>
        <div style={{display: 'flex' , justifyContent: 'space-between' , alignItems: "center"}}>
        <CardHeader title="Your Profile Details" />
        <Box sx={{ mt: 2 }}
            marginRight="12px">
            <Button
              color="primary"
              variant="contained"
              onClick={handleLogout}
          
            >
              Log Out
            </Button>
          </Box>
        </div>
        <PropertyList>
        <PropertyListItem
          align={align}
          label="First Name"
        >
          <Typography variant="subtitle2">
            {state?.firstName}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Last Name"
          value={state?.lastName}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Email"
          value={state?.userName}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Phone"
          value={state?.mobile}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Company"
          value={state?.companyName}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Type"
          value={state?.type}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Address"
          value={state?.address+', '+state?.city+', '+state?.state+', '+state?.country}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="ZipCode"
          value={state?.pincode}
        >
        </PropertyListItem>
      </PropertyList>
        <Divider/>
      </Card>

    </>
  );
};

export default Page;