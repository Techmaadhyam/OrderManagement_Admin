import { useCallback, useEffect, useState } from 'react';
import {  Box, Container, Stack } from '@mui/material';
import { customersApi } from 'src/api/customers';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import {EditSalesOrder } from 'src/sections/dashboard/order/salesorder-edit';
import { SalesOrderEditForm } from 'src/sections/dashboard/order/salesorder-edit-form';

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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <SalesOrderEditForm customer={customer}/>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
