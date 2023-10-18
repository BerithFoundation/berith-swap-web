import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { setSwapAddress, setSwapAmount } from "../../../store/SwapInfoStore"
import ABI from "../../../contract/BerithSwap.json"
import "./SwapInfoBox.css"
import Web3, { Contract, ContractAbi } from "web3"
import { setErrorMessage } from "../../../store/ErrorMessageStore"
import { ErrorType } from "../../../actions/types"
import { useEffect, useState } from "react"
import { setBalance } from "../../../store/AccountStore"

const addressRegex = /(\b0x[a-f0-9]{40}\b)/g
const amountRegex = /^\d+(\.\d{1,18})?$/g


const SwapInfoBox = () =>{
    const addressAction = useAppSelector<string>(state => state.account.address)
    const balanceAction = useAppSelector<number>(state => state.account.balance)
    const swapAddressAction = useAppSelector<string>(state => state.swapInfo.swapAddress)
    const swapAmountAction = useAppSelector<number>(state => state.swapInfo.swapAmount as number)
    const web3Action = useAppSelector(state => state.walletConn.web3) as Web3
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
            dispatch(setErrorMessage(ErrorType.InsufficientBalance))
        }
    }
    
    const handleDeposit = async () => {
        if (!web3Action){
            dispatch(setErrorMessage(ErrorType.NotConnected))    
            return
        }
        if (!String(swapAmountAction).match(amountRegex)){
            dispatch(setErrorMessage(ErrorType.InvalidAmount))    
            return
        }
        if (!swapAddressAction.match(addressRegex)){
            dispatch(setErrorMessage(ErrorType.InvalidAddress))
            return
        }
        const gasLimit = 3000000

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
            if (Number(balance) === 0){
                dispatch(setErrorMessage(ErrorType.ZeroBalance))
            }
            dispatch(setBalance(Number(balance)/1e18))
            dispatch(setSwapAmount(Number(balance)/1e18))

        }catch(error){
            dispatch(setErrorMessage(ErrorType.DepositFailed))
            console.error(error)
            return
        }
        dispatch(setErrorMessage(ErrorType.NoError))
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

    return (
        <div className="SwapInfo_wrap">
            <div className="SwapInfo_input_wrap">
                <input className="SwapInfo_input_address SwapInfo_input_box" placeholder={addrCheck?"송금할 주소를 입력해 주세요.":"Metamask를 연결해 주세요."}value={swapAddressAction}  type="text" onChange={handleChangeAddress} disabled={!addrCheck}/>
                <input className="SwapInfo_input_amount SwapInfo_input_box" value={swapAmountAction} type="number" onChange={handleChangeAmount}/>
                <button className="SwapInfo_button" onClick={handleDeposit}>송금하기</button>
            </div>
            <div className="SwapInfo_checkbox_wrap">
                <input type="checkbox" id="addrCheck" onChange={handleAddrCheck}/ >
                <label htmlFor="addrCheck">다른 주소로 송금하기</label>
            </div>
        </div>
    )
}

export default SwapInfoBox;