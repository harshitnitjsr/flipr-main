import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Container, TextField, Typography } from '@mui/material';

import { motion } from 'framer-motion';
import PulseLoader from 'react-spinners/PulseLoader';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo1")) {
      nav('/s');
    }
  }, [nav]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!data.name || !data.password || !data.email || !data.password2) {
      toast.warning('Please fill in all the fields', { position: toast.POSITION.TOP_LEFT });
      setLoading(false);
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch('https://backend3.vercel.app/api/users/register', requestOptions);
    const responseData = await response.json();

    if (!responseData.error) {
      toast.success('Successfully registered', { position: toast.POSITION.TOP_LEFT, autoClose: 1000 });
      setLoading(false);
      nav('/login');
    } else {
      toast.warning(responseData.error, { position: toast.POSITION.TOP_LEFT, autoClose: 1000 });
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxWidth="md" style={{ marginTop: '5rem' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        <PulseLoader color="#000000" loading={loading} size={15} />
        <Container maxWidth="sm">
          <form>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              name="password2"
              type="password"
              onChange={handleChange}
              variant="outlined"
            />
            <Typography variant="body2" align="center">
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              style={{ marginTop: '1rem' }}
              onClick={handleClick}
            >
              Register
            </Button>
          </form>
        </Container>
      </Container>
    </motion.div>
  );
};

export default Register;
