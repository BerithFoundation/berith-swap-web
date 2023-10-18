import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import SwapInfoBoxComponent from '../swapInfoBox/SwapInfoBox';
import "./home.css"
import WalletConnectButton from '../walletConnectButton/WalletConnectButton';
import ErrorMessage from '../errorMessage/ErrorMessage';

const Home = () => {

    return (
        <div className='Home_wrap'>
            <WalletConnectButton />
            <div className='Home_berith_title'>
                <img className='Home_berith_logo' src="/assets/berith_logo.png"/>
                <h1>Berith Swap</h1>
            </div>
            <SwapInfoBoxComponent />
            <ErrorMessage />
        </div>
    )
}

export default Home;