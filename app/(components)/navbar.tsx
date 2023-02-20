
import navstyle from "../(styles)/navbar.module.css";
import searchIcon from "public/search-icon.svg";
import Image from "next/image";

const Navbar = () => {


    
    return (
        <>
            <div className={navstyle['wrapper']}>


                <h1 className={navstyle['weather-txt']}>Weather⛅</h1>

                <div className={navstyle['search-city']}>
                    <div className={navstyle['search']}>
                        <Image draggable="false" src={searchIcon} alt="Search Icon" width={30} height={30} />
                        <input placeholder="Search for your city"></input>
                    </div>
                    <button className={navstyle['enter']}>Go</button>
                </div>



            </div>


        </>
    )
}

export default Navbar;