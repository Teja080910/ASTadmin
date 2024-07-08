import { useToast } from '@chakra-ui/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CryptoAES from 'crypto-js/aes';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Actions } from '../../actions/actions';


const defaultTheme = createTheme();

export const LoginForm = () => {
  const [mail, setMail] = useState()
  const dispatch = useDispatch()
  const toast = useToast()
  const [loading,setLoading] = useState(false)
  const [password, setPassword] = useState()
  document.title = "LOGIN | AST ADMIN"

  const Login = async () => {
    setLoading(true)
    await Actions.BootAdminLogin(mail, password)
      .then((res) => {
        if (res?.data?.message) {
          dispatch({ type: 'BOOT', payload: { bootmail: res?.data?.data?.Gmail, bootpassword: CryptoAES.encrypt(res?.data?.data?.Password, res?.data?.data?.Gmail).toString() } });
          toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
          window.location.href = '/bootcamp'
        }
        if (res?.data?.error) {
          toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
        }
      })
      .catch((e) => console.log(e))
      .finally(
        ()=>{
          setLoading(false);
        }
      )
  }
  const handelKeyDown =(e)=>{

   if(e.key === "Enter"){
    Login()
   }

  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container className='adminlogin' component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          boxShadow='dark-lg' p='6' rounded='md' bg='white'        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type='email'
              autoComplete="email"
              onChange={(e) => setMail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handelKeyDown}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={Login}
            >
           {loading ?"logging in ....": "Sign In"}  
            </Button>
          
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}