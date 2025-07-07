import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import ScrollToTop from '../../components/shared/ScrollToTop/ScrollToTop';
import Navbar from '../../components/shared/Navbar/Navbar';
import Footer from '../../components/shared/Footer/Footer';
import Loader from '../../components/shared/Loader/Loader';

const RootLayout = () => {

    const { state } = useNavigation();

    return (
        <div>
            <ScrollToTop></ScrollToTop>

            <header>
                <Navbar></Navbar>
            </header>

            <main>
                {
                    state === 'loading' ? <Loader></Loader> : <Outlet></Outlet>
                }
            </main>

            <footer>
                <Footer></Footer>
            </footer>   
        </div>
    );
};

export default RootLayout;