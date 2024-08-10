import React from 'react';
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import './global.css';
import Login from './components/views/Login';
import { AuthProvider, useAuth } from './components/hooks/AuthProvider';
import NavBar from './components/NavBar';
import theme from './components/theme';
import { Admins } from './components/views/Admins';
import { AdminEdit } from './components/views/AdminEdit';
import { Promotions } from './components/views/Promotions';
import { PromotionEdit } from './components/views/PromotionEdit';
import { Header } from './components/Header';
import { About } from './components/views/About';
import { NotFound } from './components/views/NotFound';

const AppContent: React.FC = () => {
    const { token } = useAuth();
    
    return (
        <div>
            {token && <Header />}
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center' }}>
                <CssBaseline />
                {token && (
                    <Box sx={{ marginRight: { sm: '30px', xs: '0' }, marginLeft: { sm: '10px', xs: '0' }, marginTop: { xs: '10px', sm: '20px', md: '35px' } }}>
                        <NavBar />
                    </Box>
                )}
                <Box component="main" sx={{ flexGrow: 1, marginTop: { xs: '10px', sm: '20px', md: '35px' }, width: 0, maxWidth: '850px', marginRight: '10px', marginLeft: { xs: '10px', sm: 0 } }}>
                    <Routes>
                        <Route path='*' element={<NotFound/>} />
                        <Route path='/no-access' element={<Navigate to="/about" />} />
                        <Route path='/about' Component={ About } />
                        <Route path="/login" Component={ Login } />
                        <Route path="/admins" Component={ Admins } />
                        <Route path="/promotions" Component={ Promotions } />
                        <Route path='/edit/admin/:id' Component={ AdminEdit } />
                        <Route path='/edit/promotion/:id' Component={ PromotionEdit }  />
                        <Route path="/" element={<Navigate to="/promotions" />}/>
                    </Routes>
                </Box>
            </Box>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App;
