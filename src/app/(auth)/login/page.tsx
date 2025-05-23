import LoginForm from '@/components/modules/Auth/login/LoginForm';
import Image from 'next/image';
import React from 'react';
import img from '../../../../public/images/img14.jpg'
const LoginPage = () => {
    return (
        <div className='relative flex items-center justify-center w-screen h-screen'>
            <Image src={img} width={5000} height={5000}
            className='absolute object-cover w-full h-full' alt="login" />
            <LoginForm />
        </div>
    );
};

export default LoginPage;