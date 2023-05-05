import { useCallback, useEffect, useState } from 'react';
import MessageChatSquareIcon from '@untitled-ui/icons-react/build/esm/MessageChatSquare';
import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Image01Icon from '@untitled-ui/icons-react/build/esm/Image01';
import UserPlus02Icon from '@untitled-ui/icons-react/build/esm/UserPlus02';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Tooltip,
  Card,
  CardHeader,
  TextField,
  Typography,
  Link,
  Grid
} from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { socialApi } from 'src/api/social';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';


const tabs = [
  { label: 'Timeline', value: 'timeline' },
  { label: 'Connections', value: 'connections' }
];

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

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await socialApi.getPosts();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      handlePostsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return posts;
};

const useConnections = (search = '') => {
  const [connections, setConnections] = useState([]);
  const isMounted = useMounted();

  const handleConnectionsGet = useCallback(async () => {
    const response = await socialApi.getConnections();

    if (isMounted()) {
      setConnections(response);
    }
  }, [isMounted]);

  useEffect(() => {
      handleConnectionsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);

  return connections.filter((connection) => {
    return connection.name?.toLowerCase().includes(search);
  });
};

export const Page = () => {
  const profile = useProfile();
  const [currentTab, setCurrentTab] = useState('timeline');
  const [status, setStatus] = useState('not_connected');
  const posts = usePosts();
  const [connectionsQuery, setConnectionsQuery] = useState('');
  const connections = useConnections(connectionsQuery);

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
  const align = 'horizontal' 

  return (
    <>
      <Seo title="Dashboard: Social Profile" />
  
        <Card style={{marginBottom: "12px" }}>
        <CardHeader title="Your Profile Details" />
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
