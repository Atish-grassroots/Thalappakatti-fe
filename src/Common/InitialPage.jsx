import { jwtDecode } from 'jwt-decode';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InitialPage = () => {
    
    // console.log("tenantName ini", tenantName);
    const navigate = useNavigate();
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        // let decodedToken: DecodedToken | null = null;
        let decodedToken = jwtDecode(storedToken);
        let getTenantName = decodedToken.userId.TenantName
        if (decodedToken && decodedToken.userId.Role === "1") {
          navigate(`/${getTenantName}/admin`);
        } else if (decodedToken && decodedToken.userId.Role === "2") {
          navigate(`/${getTenantName}/agent`);
        }
      }
    }, []);

    return (
        
        <body style={{ backgroundSize: 'cover', overflow: 'hidden', backgroundRepeat: 'no-repeat', height: '100vh', width: '100vw', margin: 0,justifyContent: 'center', alignItems: 'center' }}>
            <img src='https://www.pushengage.com/wp-content/uploads/2022/02/Best-Website-Welcome-Message-Examples.png' alt="Welcome" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </body>
    );
};

export default InitialPage;
