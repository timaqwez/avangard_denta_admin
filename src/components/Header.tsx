import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { BaseIcon } from "./icons/BaseIcon"
import { AccountButton } from "./buttons/AccountButton"
import { AdminIcon } from "./icons/AdminIcon"
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Account } from "./hooks/AuthProvider"

export const Header: React.FC = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState<Account>();

    useEffect(() => {
        let account_str = localStorage.getItem('account')
        if (account_str) {
            setAccount(JSON.parse(account_str))
        }
    }, [])

    function logout () {
        Cookies.remove('token')
        localStorage.clear()
        window.location.reload();
        navigate('/login')
    }

    return <Box
    sx={{
        display: 'flex',
        width: '100%',
        background: '#47997A', 
        height: '10dvh', 
        justifyContent: 'center',
    }}>
    <Box
        sx={{
            display: 'flex',
            width: '1150px',
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 15px',
        }}
        
    >
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}} key='header-logo' onClick={() => {navigate('/')}}>
            <BaseIcon key='header-logo-icon' height={20}>
                <svg key='header-logo-icon-svg' width="78" height="129" viewBox="0 0 78 129" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path key='header-logo-icon-svg-path' fillRule="evenodd" clipRule="evenodd" d="M73.7781 54.537C79.0166 59.7755 79.0166 68.2691 73.7781 73.5076L23.1914 124.093C17.9532 129.332 9.46013 129.332 4.22171 124.094C-1.01661 118.855 -1.01661 110.362 4.22171 105.124L45.3231 64.0223L4.22171 22.9209C-1.01662 17.6824 -1.01662 9.18969 4.22171 3.95119C9.46012 -1.28732 17.9532 -1.28732 23.1914 3.95119L73.7781 54.537Z"/>
                </svg>
            </BaseIcon>
            <Box key='header-logo-text' sx={{color: 'white', fontFamily: 'Quicksand', textWrap: 'nowrap', paddingBottom: {md: '4px', xs: '2px'}, fontSize: { md: '30px', sm: '20px' }, fontWeight: '600', userSelect: 'none'}}>admin.avangard-denta.ru</Box>
        </div>
        <div key='header-account' style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', color: 'white', gap: '20px'}}>
            <AccountButton 
            handlers={
                    [
                        {id: 'logout', title: 'Выход', icon: <AdminIcon/>, handler: logout}
                    ]
                }
            username={account?.username}
                />
        </div>
        
    </Box>
    </Box>
    
}