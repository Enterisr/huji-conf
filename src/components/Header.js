import './Header.css';
import {lightTheme} from '../themes/lightTheme'
import {darkTheme} from "../themes/darkTheme";
import * as React from "react";
import {GiSecretBook} from 'react-icons/gi';
import {GiNightSky} from 'react-icons/gi';
import {FaFacebook} from 'react-icons/fa'

const Header = (props) => {

    function changeTheme() {
        props.theme === 'light' ? props.onChangeTheme('dark') : props.onChangeTheme('light');
    }

    function renderTheme() {
        let root = document.documentElement;

        if (props.theme === 'light') {
            root.style.setProperty('--header-bg', lightTheme.headerBG);
            root.style.setProperty('--header-border', lightTheme.headerBorder);
            root.style.setProperty('--lock-border', lightTheme.lockBorder);
            root.style.setProperty('--lock-background', lightTheme.lockBG);
        } else {
            root.style.setProperty('--header-bg', darkTheme.headerBG);
            root.style.setProperty('--header-border', darkTheme.headerBorder);
            root.style.setProperty('--lock-border', darkTheme.lockBorder);
            root.style.setProperty('--lock-background', darkTheme.lockBG);
        }
    }



    renderTheme();

    return (
        <div className="header-line">
            <GiSecretBook className="lock-icon"/>
            <div className="title-text">
                <a href="https://new.huji.ac.il/"
                   style={{color: "white", textDecorationColor:'light' ? lightTheme.headerBG : darkTheme.headerBG}}>
                    Huji Confessions
                </a>
            </div>
            <div className="side-icons">
                <GiNightSky className="night-mode" onClick={changeTheme}
                />
                <span className="space"/>
                <FaFacebook className="facebook-link"
                            onClick={() => window.open("https://www.facebook.com/ConfessionsHUJI/")}/>
            </div>
        </div>
    );
}

export default Header;