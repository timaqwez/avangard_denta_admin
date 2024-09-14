import React, { ReactNode } from 'react';
import { ListItem, BottomNavigation, BottomNavigationAction, Paper, Box, Card, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdminIcon } from './icons/AdminIcon';
import { PromotionIcon } from './icons/PromotionIcon';
import { InfoIcon } from './icons/InfoIcon';
import { checkPermissions } from './functions/checkPermissions';
import { AccountIcon } from './icons/AccountIcon';

interface MenuItem {
  text: string,
  icon: ReactNode,
  path: string,
  model: string,
  permissions?: string[],
}


const NavBar: React.FC = () => {
  const location = useLocation()
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const bottomNavHeight = 56;
  const activeColor = '#3f3f3f';
  const inactiveColor = '#9e9e9e';
  const iconSize = 22;


  const menuItems: MenuItem[][] = [
    [
      { text: 'Добавить реферала', icon: <AccountIcon height={iconSize} width={iconSize}/>, path: '/referrals/add', model: 'referral', permissions: ['referrals'] },
      { text: 'Акции', icon: <PromotionIcon height={iconSize} width={iconSize}/>, path: '/promotions', model: 'promotion', permissions: ['promotions', 'partners', 'referrals'] },
    ],
    [
      { text: 'Администраторы', icon: <AdminIcon height={iconSize} width={iconSize}/>, path: '/admins', model: 'admin', permissions: ['accounts', 'roles', 'permissions'] },
      { text: 'Справка', icon: <InfoIcon height={iconSize} width={iconSize}/>, path: '/about', model: 'about' },
    ]
  ];
  
  const desktopSidebar = (
    <Box>
      <Card
        elevation={0} sx={{background: '#F8F9FA',
          display: { xs: 'none', sm: 'block' },
          width: '250px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', padding: '10px 0' }}>
          {
            menuItems.map((itemsList, index) => (
              <React.Fragment key={index}>
                {
                  itemsList.map((item: MenuItem) => (
                    <>
                    {checkPermissions(item.permissions) && <ListItem
                      component={Link}
                      to={item.path}
                      key={item.text}
                      sx={{
                        color: location.pathname === item.path || location.pathname.includes(item.model) ? activeColor : inactiveColor,
                        padding: '5px 20px',
                        transition: '0.3s',
                        "&:hover": {color: location.pathname === item.path || location.pathname.includes(item.model) ? activeColor : '#7a7a7a'},
                      }}
                    >
                      <div style={{ marginRight: '15px', alignSelf: 'center', marginTop: '6px', marginLeft: '6px', marginBottom: '0' }} >
                        {item.icon}
                      </div>
                      <a style={{ fontWeight: '800' }}>{item.text}</a>
                    </ListItem>}
                    
                    </>
                  ))
                }
                {index < menuItems.length - 1 && <Divider variant='middle' sx={{margin: '5px 20px'}}/>}
              </React.Fragment>
            ))
          }
        </div>
      </Card>
    </Box>
  );

  const mobileSidebar = (
    <Paper
      sx={{
        display: { xs: 'block', sm: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: bottomNavHeight,
        zIndex: 1200,
        margin: '4px 0',
        padding: '4px 0',
      }}
    >
      <BottomNavigation
        value={location.pathname}
        showLabels
      >
        {menuItems.flat().map((item) => (
          <>
          {checkPermissions(item.permissions) && <BottomNavigationAction
            key={item.path}
            component={Link}
            to={item.path}
            label={item.text}
            value={item.path}
            icon={item.icon}
            disableRipple
            showLabel
            style={{
              color: location.pathname === item.path || location.pathname.includes(item.model) ? activeColor : inactiveColor,
              fontWeight: '600',
              textAlign: 'center',
              lineHeight: '1.2',
              gap: '5px'
            }}
          />
          }</>
        ))}
      </BottomNavigation>
    </Paper>
  );
  return (
    <>
      {isMobile ? mobileSidebar : desktopSidebar}
    </>
  );
};

export default NavBar;

      