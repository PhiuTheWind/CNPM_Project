import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/HomeBeforeLogin.module.css';
import { useNavigate } from 'react-router-dom';
//import { useCookies } from "react-cookie";
import banner from '../assets/banner.png';
import login from '../assets/login.png';
import Footer from './Footer';
import Header from './Header';
import { useLocation } from 'react-router-dom';

function HomeBeforeLogin(){
    // console.log("ggggggggggggggggggg")
    // //const [cookies] = useCookies();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const url = 'http://localhost:3000/api';
    // console.log(location)
    // // useEffect(() => {
    // //     if (!cookies.auth && localStorage.length > 0) {
    // //       localStorage.clear();
    // //       navigate('/');
    // //     }
    // //   }, [cookies]);
      
    // useEffect(() => {
    //     const checkAuthentication = async () =>{
    //         console.log("eeeeeeeeeeeeeeeeeeee")
    //         const token = localStorage.getItem('userCredentials') ? JSON.parse(localStorage.getItem('userCredentials')).token : null;

    //         if (token) {
    //             try {
    //                 const response = await axios.post(url,{},
    //                     {
    //                         withCredentials: true
    //                     },
    //                     {
    //                         headers: {
    //                             'Authorization': `Bearer ${token}`
    //                         }
    //                     }
    //                 );
    //                 // Nếu token hợp lệ, điều hướng đến trang student homepage
    //                 if (response.status === 200) {
    //                     navigate('/student-homepage'); // Điều hướng tới trang student homepage
    //                 }
    //             } 
    //             catch (error) {
    //                 log.console(error)
    //             // if (error.response && error.response.status === 401) {
    //             //     // Nếu token không hợp lệ hoặc hết hạn, điều hướng tới trang login
    //             //     navigate('/login'); // Điều hướng tới trang login
    //             // }
    //             }
    //         // } else {
    //         //     // Nếu không có token, điều hướng tới trang login
    //         //     navigate('/login');
    //         // }
    //         };
    //     }
    // }, [location, navigate]);

    
    return(
        <div className={styles.container}>
            <Header text='XIN CHÀO'/>
            <section className={styles.banner}>
            <img src={banner} alt="Banner" className={styles.banner_image} />
            <Link to='/user'>
                <img src={login} alt="Login button" className={styles.login_image}></img>                
            </Link>
            </section>
            <Footer/>
        </div>
        // <div className={styles.container}>
        //     <Header/>
        //     <Footer/>
        // </div>
    );
};

export default HomeBeforeLogin;