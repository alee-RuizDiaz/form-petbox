import React from 'react';
import Logo from '../assets/img/Logo.png';

const NavBar = () => {
    return (
        <nav className='flex justify-between p-[10px]  lg:px-[50px]'>
            <img className='lg:w-[60px] w-[60px]' src={Logo} alt="Logo" />           
            <button className='px-5 rounded-full bg-[#C8EAEA] text-font font-quicksand font-semibold btn-animation text-[13px] lg:text-[16px]'>🎉 -30 % HOY</button>
        </nav>
    );
};

export default NavBar;