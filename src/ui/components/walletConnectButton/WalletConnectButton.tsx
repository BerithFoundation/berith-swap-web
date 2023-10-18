import Web3 from "web3"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import "./WalletConnectButton.css"
import { ErrorType, Network } from "../../../actions/types"
import { setErrorMessage } from "../../../store/ErrorMessageStore"
import { setAddress,setBalance } from "../../../store/AccountStore"
import { setWalletConn,setWeb3 } from "../../../store/WalletConnStore"
import { useEffect } from "react"
import { setSwapAddress,setSwapAmount } from "../../../store/SwapInfoStore";

export const berithNetwork: Network = {
    chainId: "0x6A",
    chainName: "Berith Mainnet",
    nativeCurrency: {
        name: "Berith mainnet",
        symbol: "BERS",
        decimals: 18,
    },
    rpcUrls: ['https://bers.berith.co'],
    blockExplorerUrls: ['https://berithscan.com/'],
};

const berithMainnetChainId = BigInt(106);
const berithTestChainId = BigInt(107);

const WalletConnectButton = () => {
    const web3Action = useAppSelector(state => state.walletConn.web3)
    const walletConnAction = useAppSelector(state => state.walletConn.isWalletConnected)
    const addressAction = useAppSelector(state => state.account.address)
    const balanceAction = useAppSelector(state => state.account.balance)

    const dispatch = useAppDispatch();

    const addAndConnNetwork = async () => {
        try{
           window.ethereum && await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [berithNetwork],
            });
        }catch{
            dispatch(setErrorMessage(ErrorType.ConnectionFailed))
            console.error(Error("Failed to add network"))
        }
    };

    const connectToWallet = async () => {
        if (!window.ethereum) {
            dispatch(setWalletConn(false))
            dispatch(setErrorMessage(ErrorType.NotInstalled))
            throw new Error("Wallet is not installed");
        }
        const newWeb3 = new Web3(window.ethereum) as Web3
        dispatch(setWeb3(newWeb3))
        dispatch(setWalletConn(true))
        dispatch(setErrorMessage(ErrorType.NoError))

    }

    useEffect(()=>{
        if (!web3Action || !walletConnAction){
            dispatch(setErrorMessage(ErrorType.NotConnected))
            return
        }

        const getChainId = async () => {
            try {
                const chainId = await web3Action.eth.getChainId() as BigInt;
                if (chainId !== berithMainnetChainId || chainId !== berithTestChainId) {
                    addAndConnNetwork();
                }
            }catch{
                dispatch(setErrorMessage(ErrorType.InvalidNetwork))
            }

        }

        const getAccounts = async () => {
            try {
                const accounts = await web3Action.eth.requestAccounts() as string[];
                if (!accounts || !Array.isArray(accounts)){
                    dispatch(setErrorMessage(ErrorType.NoAccounts))
                }
                dispatch(setAddress(accounts[0]))
                dispatch(setSwapAddress(accounts[0]))
            }catch{
                dispatch(setErrorMessage(ErrorType.NoAccounts))
            }
        }
        getChainId()
        getAccounts()
    },[walletConnAction])

    useEffect(()=>{
        if (!web3Action){
            dispatch(setErrorMessage(ErrorType.NotConnected))
            return
        }

        const getBalance = async () => {
            try {
                const balance = await web3Action.eth.getBalance(addressAction) as BigInt
                if (Number(balance) === 0){
                    dispatch(setErrorMessage(ErrorType.ZeroBalance))
                }
                dispatch(setBalance(Number(balance)/1e18))
                dispatch(setSwapAmount(Number(balance)/1e18))
            }catch{
                dispatch(setErrorMessage(ErrorType.NoAccounts))
            }
        }

        getBalance()
    },[addressAction])

    return(
        <div className='Metamask_connection_info'>
            <img className='Metamask_logo' src="/assets/icn-metamask.svg"/>
            {
                walletConnAction?
                <p className='Metamask_message' style={{color:"#34C724"}}>{balanceAction} BERS</p>:
                <button className='Metamask_connect_button' onClick={connectToWallet}>연결하기</button>
            }
        </div>
    )
}

export default WalletConnectButton;