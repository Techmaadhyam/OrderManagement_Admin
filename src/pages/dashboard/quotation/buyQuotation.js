
import {
  Box,
  Container,
  Stack,
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
//import { QuotationOrderCreateForm } from 'src/sections/dashboard/quotation/quotationorder-create-form';
import { CreateTable } from 'src/pages/components/createTable';
import { customersApi } from 'src/api/customers';
import { useMounted } from 'src/hooks/use-mounted';
import { useState,useCallback, useEffect } from 'react';

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
            {/* <QuotationOrderCreateForm customer={customer}
quotationForm={true} /> */}
<CreateTable customer={customer}
quotationForm={true} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;

