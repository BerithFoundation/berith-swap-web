import SwapInfoBoxComponent from '../swapInfoBox/SwapInfoBox';
import "./Home.css"
import WalletConnectButton from '../walletConnectButton/WalletConnectButton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import SuccessMessage from '../successMessage/SuccessMessage';
import { useAppSelector } from '../../../hooks/hooks';

const Home = () => {
    const langAction = useAppSelector(state => state.language.isEng);

    return (
        <div className='Home_wrap'>
            <div className="Home_main">
                <div className='Home_berith_title'>
                    <img className='Home_berith_logo' src="/assets/berith_logo.png" alt='Berith'/>
                    <h1>Berith Swap</h1>
                    <WalletConnectButton />
                </div>
                <SwapInfoBoxComponent />
                <ErrorMessage />
                <SuccessMessage />
            </div>
            {
                langAction?
                <div className='Home_info'>
                    <h3>Cautions</h3>
                    <p>Klaytn tokens from a successful exchange will be delivered to the address you entered.</p>
                    <p>The swap quantity is set to the total quantity held by the account at the time of Metamask connection and can be reduced by adjusting the value directly.</p>
                    <p>Berith-chain's transaction fee is deducted from the requested quantity and then exchanged for Klaytn tokens.</p>
                    <p>It takes about 1 minute for the swap request to be reflected on the Klaytn mainnet.</p>
                    <p>The Swap feature does not work on mobile and only works on PC browsers with the MetaMask extension installed.</p>
                    <p>If Swap fails, please contact <a href="mailto:support@berith.co">support@berith.co</a></p>
                </div> :
                <div className='Home_info'>
                    <h3>주의사항</h3>
                    <p>교환에 성공한 Klaytn 토큰은 입력한 주소로 전달됩니다.</p>
                    <p>Swap 수량은 Metamask 연결 시 어카운트가 보유한 전체 수량으로 설정되며 값을 직접 조정하여 줄일 수 있습니다.</p>
                    <p>요청한 수량에서 Berith-chain의 트랜잭션 수수료가 차감된 뒤 Klaytn 토큰으로 교환됩니다.</p>
                    <p>Swap 요청 이후 Klaytn 메인넷에 반영되기까지 약 1분의 시간이 소요됩니다.</p>
                    <p>Swap 기능은 모바일에서 작동되지 않으며, 메타마스크 확장프로그램이 설치된 PC 브라우져에서만 작동됩니다.</p>
                    <p>Swap 실패 시, <a href="mailto:support@berith.co">support@berith.co</a>로 문의 바랍니다.</p>
                </div>
            }
        </div>
    )
}

export default Home;