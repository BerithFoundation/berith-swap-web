import Web3 from "web3"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import "./WalletConnectButton.css"
import { ErrorType, Network } from "../../../actions/types"
import { setErrorMessage } from "../../../store/ErrorMessageStore"
import { setAddress,setBalance } from "../../../store/AccountStore"
import { setChainId, setWalletConn,setWeb3 } from "../../../store/WalletConnStore"
import { useEffect } from "react"
import { setSwapAddress,setSwapAmount } from "../../../store/SwapInfoStore";
import { MetaMaskInpageProvider } from "@metamask/providers"

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

const WalletConnectButton = () => {
    const web3Action = useAppSelector(state => state.walletConn.web3)
    const walletConnAction = useAppSelector(state => state.walletConn.isWalletConnected)
    const balanceAction = useAppSelector(state => state.account.balance)

    const dispatch = useAppDispatch();

    const addAndConnNetwork = async () => {
        try{
            window.ethereum && await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x6A" }],
            });
        }catch (switchError: any){
            if (switchError.code === 4902){
                try{
                    window.ethereum && await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [berithNetwork],
                    });
                    dispatch(setChainId(berithMainnetChainId.toString()))
                }catch (addError: any){
                    dispatch(setErrorMessage(ErrorType.CannotAddNetwork))
                    console.error(addError)
                }
            }else{
                dispatch(setErrorMessage(ErrorType.CannotSwitchNetwork))
                console.error(switchError)
            }
        }
    };

    const getChainId = async () => {
        if (!web3Action || !walletConnAction){
            dispatch(setErrorMessage(ErrorType.NotConnected))
            return
        }

        try {
            const chainId = await web3Action.eth.getChainId() as BigInt;
            dispatch(setChainId(chainId.toString()))
            if (chainId !== berithMainnetChainId) {
                await addAndConnNetwork();
            }else{
                await getAccountInfo();
            }
        }catch{
            dispatch(setErrorMessage(ErrorType.InvalidNetwork))
        }


    }

    const getAccountInfo = async () => {
        if (!window.ethereum) {
            dispatch(setWalletConn(false))
            dispatch(setErrorMessage(ErrorType.NotInstalled))
            throw new Error("Wallet is not installed");
        }
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
            if (!accounts || !Array.isArray(accounts)){
                dispatch(setErrorMessage(ErrorType.NoAccounts))
            }
            dispatch(setAddress(accounts[0]))
            dispatch(setSwapAddress(accounts[0]))

            const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] }) as BigInt
            if (Number(balance) === 0){
                dispatch(setErrorMessage(ErrorType.ZeroBalance))
            }
            dispatch(setBalance(Number(balance)/1e18))
            dispatch(setSwapAmount(Number(balance)/1e18))
            dispatch(setErrorMessage(ErrorType.NoError))
        }catch{
            dispatch(setErrorMessage(ErrorType.NoAccounts))
        }
    }

    const connectToWallet = async () => {
        if (!window.ethereum) {
            dispatch(setWalletConn(false))
            dispatch(setErrorMessage(ErrorType.NotInstalled))
            throw new Error("Wallet is not installed");
        }

        const provider = window.ethereum as MetaMaskInpageProvider

        provider.on('chainChanged', async (chainId) => {
            console.log("chainChanged",chainId)
            await getAccountInfo();
            if (chainId !== '0x6a') {
                dispatch(setErrorMessage(ErrorType.InvalidNetwork))
            }
        });

        provider.on('accountsChanged', () => {
            getAccountInfo();
        });

        const newWeb3 = new Web3(provider) as Web3
        dispatch(setWeb3(newWeb3))
        dispatch(setWalletConn(true))
        dispatch(setErrorMessage(ErrorType.NoError))
    }

    useEffect(()=>{
        getChainId();
    },[walletConnAction])

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