import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Alert,
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
import { useEffect, useState, useContext } from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


const initialValues = {
  email: 'demo@devias.io',
  password: 'Password123!',
  submit: null
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string()
    .max(255)
    .required('Password is required')
});



const Page = () => {
  const [notification, setNotification] = useState(false);
  const [getPassword, setGetPassword]= useState('')
  const [userId, setUserId]= useState('')

  const [username,setUsername]= useState('')
  const [password, setPassword]= useState('')

  const isMounted = useMounted();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');



 const handlePasswordChange = (event)=>{
  setPassword(event.target.value);
 }
const handleUsernameUpdate = (event) => {
  setUsername(event.target.value);
};

useEffect(() => {
  console.log(username);

  // Make the API call only if the username is not empty
  if (username !== '') {
    axios
      .get(`http://13.115.56.48:8080/techmadhyam/getUserByUsername/${username}`)
      .then((response) => {
        console.log(response.data);
        setGetPassword(response?.data[0]?.password);
        setUserId(response?.data[0]?.id)
        window.sessionStorage.setItem('user-id', userId);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}, [username]);

const handleClick = (e) => {
  e.preventDefault()

      if (getPassword === password && isMounted()) {
         window.location.href = returnTo || paths.dashboard.index;
     
      }

};

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
        <Card elevation={15}>
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
          <CardHeader
            subheader={(
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Don&apos;t have an account?
                &nbsp;
                <Link
                  component={RouterLink}
                  href={paths.auth.jwt.register}
                  underline="hover"
                  variant="subtitle2"
                >
                
                  Register
                </Link>
              </Typography>
            )}
            sx={{ pb: 0 }}
            title="Log in"
          />  
        
          <CardContent>
      
            <form
              noValidate
        
            >
              <Stack spacing={3}>
                <TextField
                  autoFocus
  
                  fullWidth

                  label="Username"
                  name="username"
                  value={username}
                  onChange={handleUsernameUpdate}  
                />
                <TextField
   
                  fullWidth

                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}  
                />
              </Stack>
           
              <Button
      
                fullWidth
                size="large"
                sx={{ mt: 2 }}
                type="submit"
                variant="contained"
                style={{background: `${primaryColor}`}}
                onClick={handleClick}
              
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
    
      </div>

    </>
  );
};

export default Page;
