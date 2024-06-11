import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import mylogo from '../assets/AP_Vert_Color_wPayx_R_copy no background.png'
import * as FaIcons from 'react-icons/fa' 
import { SidebarData } from './SidebarData';
import { Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css'
import { KuiCloseButton } from '@paychex/kuiper-components-core/react'
import { useCloseCallback } from './hooks/useCloseCallback'

// const Header = styled.div`
//     background-color:var(--flex-warmGrey-100); /*var(--kui-color-brand-primary);*/
//     height: 80px;
//     left: 0;
//     position: fixed!important;
//     top: 0;
//     width: 100%;
//     z-index: 3;
// `
// const Main = styled.div`
//     height: calc(100% - var(--banner-height));
//     margin-left: var(--nav-width);
//     margin-top: var(--banner-height);
//     overflow-y: auto;
//     overflow-x: hidden;
//     position: relative;
//     width: calc(100% - var(--nav-width));
//     z-index: 0;
// `
// const Nav = styled.div`
//     background-color: var(--kui-color-light);
//     box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px 0 rgb(0 0 0 / 14%), 0 1px 10px 0 rgb(0 0 0 / 12%);
//     gap: 0px!important;
//     height: calc(100% - var(--banner-height));
//     left: 0;
//     margin-top: var(--banner-height);
//     position: fixed!important;
//     top: 0;
//     vertical-align: top;
//     width: var(--nav-width);
//     z-index: 2;
// `

// const AppArea = styled.div`
//     height: 100vh;
//     width: 100%;
// `
// const HeaderImg = styled.img.attrs({
//     src:`${mylogo}`
// })`
// max-width: 270px;
// max-height: 68px;
// pointer-events: none;
// padding: 5px 2px 2px 2px;
// vertical-align: middle;
// `

// const Navbar = styled.div`
//     display: flex;
//     align-items: center;
//  `   
const MenuIconOpen = styled(Link)`
    display: flex;
    color:  var(--kui-color-brand-primary);
`

const SidebarMenu = styled.div`
    width: var(--nav-width);
    //height: 100vh;
    margin-top: 100px;
    //background-color: transperent;
    position: fixed;
    top: 0;
    //transition: .6s;
`

const MenuItems = styled.li`
    list-style: none;
    padding: 8px 0px 0px 0px;
`
const MenuItemLinks = styled(Link)`
    display: flex;
    align-items: center;
    border-left: 5px solid transparent;
    line-height: 40px;
    padding-left: 8px;
    text-decoration: none;
    
    color: var(--nav-inactive);
    &:hover {
        color: var(--nav-hover);
    };
    &:focus {
        background-color: var(--nav-active-bg);
        border-left: 5px solid var(--nav-active);
        color: var(--nav-active);
    };
`

function MenuButton({onClick}: {onClick?: () => void}): JSX.Element {
    return (
      <button className={styles.menu} data-testid="menu-button" onClick={onClick} >
        <MenuIconOpen to="#">
            <FaIcons.FaBars />
        </MenuIconOpen>
      </button>
    );
  }

const AppLayout: React.FunctionComponent = () => {
    const navRef = useRef<HTMLElement>(null);
    const [isNavShown, setIsNavShown] = useState(false);
    const onNavClose = useCallback(() => {
      console.log(isNavShown);
      setIsNavShown(!isNavShown);
    }, [isNavShown]);
    useCloseCallback({ref: navRef, callback: onNavClose});
    return (
        <>
            <div className={styles["app-area"]}>
                <header>
                    <div className={styles.banner}>
                        <MenuButton onClick={() => setIsNavShown(!isNavShown)} />
                        <img src={mylogo} className={styles.logo} alt="logo" />
                    </div>
                </header>
                <nav ref={navRef} data-testid="nav" className={isNavShown ? 'show kui-layout-flexbox kui-vertical' : ''}>
                    <span className="close-container">
                        <KuiCloseButton context="nav-close" data-testid="nav-close-button" />
                    </span>
                    <SidebarMenu>
                        {SidebarData.map((item, index) => {
                            return (
                                <MenuItems key={index}>
                                    <MenuItemLinks to={item.path}>
                                        {item.icon}
                                        <span style={{marginLeft: '10px'}}>{item.title}</span>
                                    </MenuItemLinks>
                                </MenuItems>
                            )
                        })}
                    </SidebarMenu>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>

        </>
    )
}
export default AppLayout