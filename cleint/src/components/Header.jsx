import React from 'react';
import Avatar from '@mui/material/Avatar';
import "./header.css";
import { blue } from '@mui/material/colors';

const Header = () => {
    return (
        <>
            <header>
                <nav>
                <h1> Soft</h1>
                    <div className="avtar">
                        {/* <Avatar style={{background: "blue"}}>H</Avatar> */}
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
