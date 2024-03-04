import React, { useState } from 'react';
import { Button, CircularProgress, Container, Grid, TextField, Typography, Link } from '@mui/material'; // Import components from Material-UI
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';
import axios from 'axios';
import { chakra } from '@chakra-ui/react'; // Import Chakra UI components

const Login = () => {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const [data, setData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!data.email || !data.password) {
      toast.warning('Please fill in all fields', { position: toast.POSITION.TOP_LEFT });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/users/login', data);
      const responseData = response.data;

      if (responseData.success) {
        localStorage.setItem('userInfo1', JSON.stringify(responseData));
        toast.success('Successful Login', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 });
        setLoading(false);
        nav('/s');
      } else {
        throw responseData;
      }
    } catch (error) {
      console.log(error);
      toast.warning(error.errors, { position: toast.POSITION.TOP_LEFT, autoClose: 1000 });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" mt={5}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Typography variant="h3" align="center">Login</Typography>
        <chakra.div p={4} boxShadow="md" borderRadius="md" bg="gray.100">
          {loading && <CircularProgress />} {/* Material-UI circular progress */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" variant="outlined" name="email" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" variant="outlined" type="password" name="password" onChange={handleChange} />
              <Typography>
                <Link href="/register">Don't have an account? Register</Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleClick}>Login</Button> {/* Material-UI button */}
            </Grid>
          </Grid>
        </chakra.div>
      </motion.div>
    </Container>
  );
};

export default Login;
