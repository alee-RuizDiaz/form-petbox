import React from 'react';
import Logo from '../assets/img/Logo.png';

const NavBar = () => {
    return (
        <nav className='flex justify-center p-[10px] border-b-2 border-[#d6d6d6]'>
            <img className='lg:w-[80px] w-[60px]' src={Logo} alt="Logo" />
        </nav>
    );
};

export default NavBar;