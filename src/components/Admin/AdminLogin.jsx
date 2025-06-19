// import { useState } from 'react';
// import api from '../../services/api';
// import { useNavigate } from 'react-router-dom';

// const AdminLogin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post('/admin/login', { username, password });
//       navigate('/admin/dashboard');
//        window.location.reload(); 
//     } catch (err) {
//       setError('שם משתמש או סיסמה שגויים');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <h2>התחברות מנהל</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <input value={username} onChange={e => setUsername(e.target.value)} placeholder="שם משתמש" />
//       <input value={password} onChange={e => setPassword(e.target.value)} placeholder="סיסמה" type="password" />
//       <button type="submit">התחבר</button>
//     </form>
//   );
// };

// export default AdminLogin;

import { useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/login', { username, password });
      navigate('/admin/dashboard');
      window.location.reload(); 
    } catch (err) {
      setError('שם משתמש או סיסמה שגויים');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f5f5f5',
      }}
    >
      <Card sx={{ width: 360, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" mb={2} sx={{ color: '#252e49' }}>
            התחברות מנהל
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="שם משתמש"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                style: { backgroundColor: '#f0f0f0' },
              }}
            />
            <TextField
              fullWidth
              label="סיסמה"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                style: { backgroundColor: '#f0f0f0' },
              }}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#558e9e',
                '&:hover': { backgroundColor: '#456d7d' },
                color: '#fff',
                fontWeight: 'bold',
              }}
            >
              התחבר
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLogin;
