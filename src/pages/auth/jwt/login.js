import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useAuth } from 'src/hooks/use-auth';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { useSearchParams } from 'src/hooks/use-search-params';
import { paths } from 'src/paths';
import { AuthIssuer } from 'src/sections/auth/auth-issuer';
import { primaryColor } from 'src/primaryColor'; 
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';


const initialValues = {
  email: '',
  password: '',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup
    .string()
    .max(255)
    .required('Password is required')
});

const Page = () => {
  const [notification, setNotification] = useState(false);



  const isMounted = useMounted();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const { issuer, signIn } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.email, values.password);

        if (isMounted()) {
          // returnTo could be an absolute path
          window.location.href = returnTo || paths.dashboard.index;
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  useEffect(() => {
    const storedNotification = localStorage.getItem('notification');
    if (storedNotification === 'true') {
      setNotification(true);
    }
  
    const handleBeforeUnload = () => {
      localStorage.removeItem('notification');
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  useEffect(() => {
    if (notification) {
      notifyLogin();
    }
  }, [notification]);

  const notifyLogin = () => {
    toast.success("You have successfully registered your account. Please Log In.", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  usePageView();

  return (
    <>
      <Seo title="Login" />
      <div>
        <Card elevation={15}
        sx={{ maxWidth: 450, margin : '0 auto'}}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"/>
         <Typography
          sx={{ ml: 3, mt: 3, fontSize: '1.2rem'}}
          variant="subtitle2"
          color="text.primary"
        >
          Hello! Welcome to TechMaadhyam
        </Typography>
             <CardHeader
           title={(
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{mt:-4}}
                
              >
                If you don&apos;t have an account.
                &nbsp;
                <Link
                  component={RouterLink}
                  //href={paths.auth.jwt.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Please Register Here
                </Link>
                
              </Typography>
            )}
            sx={{ pb: 0,}}
          
          />
          <h3 style={{
          alignItems: 'center',
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '-10px'
        }}
        
          >Log In</h3>
          <CardContent>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={2} >
                <TextField
                  autoFocus
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="text"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                    <Typography
                color="text.secondary"
                variant="body2"
              >
                Forgot Password?
                &nbsp;
                <Link
                  component={RouterLink}
                  href={paths.auth.jwt.register}
                  underline="hover"
                  variant="subtitle2"
                >
                  Click Here
                </Link>
                
              </Typography>

                  <Button
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                style={{background: `${primaryColor}`}}
              
              >
                Log In
              </Button>
              </Stack>
              {formik.errors.submit && (
                <FormHelperText
                  error
                  sx={{ mt: 3 }}
                >
                  {formik.errors.submit}
                </FormHelperText>
              )}
            
            </form>
          </CardContent>
        </Card>
        <Stack
          spacing={3}
          sx={{ mt: 3 }}
        >
          {/*<Alert severity="error">
            <div>
              You can use <b>demo@devias.io</b> and password <b>Password123!</b>
            </div>
          </Alert>*/}
          <AuthIssuer issuer={issuer} />
        </Stack>
      </div>
    </>
  );
};

export default Page;