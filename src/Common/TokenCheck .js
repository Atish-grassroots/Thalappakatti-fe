import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const TokenCheck = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const storedAccessToken = localStorage.getItem("token");

        if (storedAccessToken) {
            const decodedToken = jwtDecode(storedAccessToken);
            const expirationTime = decodedToken.exp * 1000;

            const checkTokenExpiration = () => {
                const currentTime = Date.now();
                if (currentTime >= expirationTime) {
                    console.log("Token expired. Logging out.");
                    localStorage.removeItem("token");
                    localStorage.removeItem("refreshToken");
                    navigate("/");
                }
            };

            const expirationCheckInterval = setInterval(checkTokenExpiration, 60 * 1000);

            checkTokenExpiration();

            return () => clearInterval(expirationCheckInterval);
        }
    }, [navigate]);

    return null; // This component does not render anything
};

export default TokenCheck;