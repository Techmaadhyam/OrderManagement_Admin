import { useCallback, useEffect, useState } from 'react';

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
    sessionStorage.clear();
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
            {data.firstName}
          </Typography>
        </PropertyListItem>
        <Divider />
        <PropertyListItem
          align={align}
          label="Last Name"
          value={data.lastName}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Email"
          value={data.email}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Phone"
          value={data.phone}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Username"
          value={data.username}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Company"
          value={data.company}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Type"
          value={data.type}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Address"
          value={data.address}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="ZipCode"
          value={data.zipCode}
        >
        </PropertyListItem>
      </PropertyList>
        <Divider/>
      </Card>

    </>
  );
};

export default Page;