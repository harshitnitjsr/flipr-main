import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { AccountCircle, Lock } from '@mui/icons-material'; // Importing Material-UI icons

const Home = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo1")) {
      nav('/s');
    }
  }, [nav]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
        <Container>
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            SOCIALIFY
          </Typography>
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="outlined" color="primary" href="/register" startIcon={<AccountCircle />}>
              Register
            </Button>
            <Button variant="contained" color="primary" href="/login" startIcon={<Lock />}>
              Login
            </Button>
          </Box>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Home;
