import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Container, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { ordersApi } from 'src/api/orders';
import { customersApi } from 'src/api/customers';
import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { OrderDrawer } from 'src/sections/dashboard/order/order-drawer';
import { OrderListContainer } from 'src/sections/dashboard/order/order-list-container';
import { OrderListSearch } from 'src/sections/dashboard/order/order-list-search';
import { OrderListTable } from 'src/sections/dashboard/order/order-list-table';
import { SalesOrderCreateForm } from 'src/sections/dashboard/order/salesorder-create-form';

const useCustomer = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);

  const handleCustomerGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomer();

      if (isMounted()) {
        setCustomer(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      handleCustomerGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return customer;
};


const Page = () => {
  const customer = useCustomer();

  usePageView();

  if (!customer) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Customer Edit" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <SalesOrderCreateForm customer={customer} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
