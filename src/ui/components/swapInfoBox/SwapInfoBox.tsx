import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { setExplorURL, setSwapAddress, setSwapAmount } from "../../../store/SwapInfoStore"
import ABI from "../../../contract/BerithSwap.json"
import "./SwapInfoBox.css"
import Web3 from "web3"
import { setErrorMessage } from "../../../store/ErrorMessageStore"
import { ErrorType } from "../../../actions/types"
import { useEffect, useState } from "react"
import { setBalance } from "../../../store/AccountStore"

const addressRegex = /(\b0x[a-fA-F0-9]{40}\b)/g
const amountRegex = /^\d+(\.\d{1,18})?$/g


const SwapInfoBox = () =>{
    const addressAction = useAppSelector<string>(state => state.account.address)
    const balanceAction = useAppSelector<number>(state => state.account.balance)
    const swapAddressAction = useAppSelector<string>(state => state.swapInfo.swapAddress)
    const swapAmountAction = useAppSelector<number>(state => state.swapInfo.swapAmount)
    const web3Action = useAppSelector(state => state.walletConn.web3) as Web3
    const errorAction = useAppSelector<ErrorType>(state => state.errorMessage.type)
    const langAction = useAppSelector<boolean>(state => state.language.isEng)
    const [contract,setContract] = useState<any>()
    const [addrCheck,setAddrCheck] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    
    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSwapAddress(e.target.value))
    }
    
    const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const numAmt = Number(e.target.value)
        dispatch(setSwapAmount(numAmt));
        if  (numAmt > balanceAction){
            dispatch(setErrorMessage({err:ErrorType.InsufficientBalance,isEng:langAction}))
        }
    }
    
    const handleDeposit = async () => {
        dispatch(setExplorURL(``))

        if (!web3Action){
            dispatch(setErrorMessage({err:ErrorType.NotConnected,isEng:langAction}))    
            return
        }
        if (!String(swapAmountAction).match(amountRegex)){
            dispatch(setErrorMessage({err:ErrorType.InvalidAmount,isEng:langAction}))    
            return
        }
        if (!swapAddressAction.match(addressRegex)){
            dispatch(setErrorMessage({err:ErrorType.InvalidAddress,isEng:langAction}))
            return
        }
        const gasLimit = 50000

        try {
            const gasPrice = await web3Action.eth.getGasPrice()
            const gasfee = gasPrice * BigInt(gasLimit)
            const balanceWei = web3Action.utils.toWei(swapAmountAction.toString(),"ether")
            const valueWei = BigInt(balanceWei) - gasfee
            const abiData = contract.methods.deposit(swapAddressAction).encodeABI()
            await contract.methods.deposit(swapAddressAction).send({
                from:addressAction,
                value: Number(valueWei),
                gasPrice: Number(gasPrice),
                gas:gasLimit,
                data:abiData,
            })

            const balance = await web3Action.eth.getBalance(addressAction) as BigInt
            dispatch(setBalance(Number(balance)/1e18))
            dispatch(setSwapAmount(Number(balance)/1e18))
            if (Number(balance) === 0){
                dispatch(setErrorMessage({err:ErrorType.ZeroBalance,isEng:langAction}))
            }else{
                dispatch(setErrorMessage({err:ErrorType.NoError,isEng:langAction}))
            }
            dispatch(setExplorURL(`https://baobab.scope.klaytn.com/account/${swapAddressAction}?tabId=tokenTransfer`))
        }catch(error){
            dispatch(setErrorMessage({err:ErrorType.DepositFailed,isEng:langAction}))
            console.error(error)
            return
        }
        dispatch(setErrorMessage({err:ErrorType.NoError,isEng:langAction}))
    }

    useEffect(()=>{
        if (web3Action){
            setContract(new web3Action.eth.Contract(ABI.abi,"0x604787429eABcE974BFC8A6075ad6B1a2DC54b4c"))
        }
    },[web3Action])

    const handleAddrCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddrCheck(e.target.checked)
        if (!e.target.checked){
            dispatch(setSwapAddress(addressAction))
        }else{
            dispatch(setSwapAddress(""))
        }
    }

    const checkError = () => {
        if (
            errorAction === ErrorType.CannotAddNetwork ||
            errorAction === ErrorType.CannotSwitchNetwork ||
            errorAction === ErrorType.InvalidNetwork ||
            errorAction === ErrorType.NoAccounts ||
            errorAction === ErrorType.NotConnected ||
            errorAction === ErrorType.NotInstalled
           ) {return true}

        return false
    }

    return (
        <div className="SwapInfo_wrap">
            <div className="SwapInfo_input_wrap">
                <input className="SwapInfo_input_address SwapInfo_input_box" placeholder={addrCheck?langAction?"Please enter the address where the token should be sent.":"토큰을 전송받을 주소를 입력해 주세요.":langAction?"Please connect the Metamask.":"Metamask를 연결해 주세요."} value={swapAddressAction}  type="text" onChange={handleChangeAddress} disabled={!addrCheck}/>
                <input className="SwapInfo_input_amount SwapInfo_input_box" value={swapAmountAction} type="number" onChange={handleChangeAmount} disabled={checkError()}/>
                <button className="SwapInfo_button" onClick={handleDeposit} disabled={checkError()}>{langAction?"Deposit":"송금하기"}</button>
            </div>
            <div className="SwapInfo_checkbox_wrap">
                <input type="checkbox" id="addrCheck" onChange={handleAddrCheck} disabled={checkError()}/ >
                <label htmlFor="addrCheck">{langAction?"Receive at another address":"다른 주소로 송금하기"}</label>
            </div>
        </div>
    )
}

export default SwapInfoBox;