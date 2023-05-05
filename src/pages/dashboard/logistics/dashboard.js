import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { usePageView } from 'src/hooks/use-page-view';
import { useSettings } from 'src/hooks/use-settings';
import { AcademyDailyProgress } from 'src/sections/dashboard/academy/academy-daily-progress';
import { AcademyFind } from 'src/sections/dashboard/academy/academy-find';
import { CourseCard } from 'src/sections/dashboard/academy/course-card';
import { CourseSearch } from 'src/sections/dashboard/academy/course-search';
import { QuotationOrderCreateForm } from 'src/sections/dashboard/academy/quotationorder-create-form';
import { customersApi } from 'src/api/customers';
import { useMounted } from 'src/hooks/use-mounted';
import { useState,useCallback, useEffect } from 'react';
import { TempUserCreateForm } from 'src/sections/dashboard/logistics/temp-user-create-form';

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
            <TempUserCreateForm customer={customer} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
