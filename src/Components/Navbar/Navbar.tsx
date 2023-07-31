import { useState } from "react";
import Styles from "./Navbar.module.css"
import { useNavigate } from "react-router-dom";
export default function Navbar(){
    const [them, setTheme] = useState(false)
    const navigate = useNavigate()
    const menuHandler =()=>{
        setTheme(!them)
    }
    return <>
    <header className={Styles.header}>
        <p className={Styles.logo}>Logo</p>
        <ul className={Styles.navLinks}>
            <li className={Styles.links}>HOME</li>
            <li className={Styles.links} onClick={()=>navigate('/mylist')}>My List</li>
            <li className={Styles.links} onClick={()=>navigate('/')}>Create Todo</li>
        </ul>
        <div className={Styles.menu} onClick={menuHandler}>
    🟢
        </div>
        {them?<ul className={Styles.navForMobile}>
            {/* <li className={Styles.links}>HOME</li> */}
            <li className={Styles.links} onClick={()=>navigate('/mylist')}>My List</li>
            <li className={Styles.links} onClick={()=>navigate('/')}>Create Todo</li>
        </ul>:""}
        
    </header>
    </>
}

