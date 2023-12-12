import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const confirmLogin = (navigate) => {
    if (window.confirm('로그인 후 이용해주세요!')) {
        navigate('/login');
    } else {
        navigate(-1);
    }
};

export const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
    const isLoggedIn = Cookies.get('key');
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            confirmLogin(navigate);
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? element : null;
};


