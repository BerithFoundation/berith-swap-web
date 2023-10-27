import { useAppSelector } from "../../../hooks/hooks";
import "./SuccessMessage.css"


const SuccessMessage = ()=>{
    const explorUrlAction = useAppSelector(state => state.swapInfo.explorURL)
    const langAction = useAppSelector(state => state.language.isEng);

    return (
        <div>
            {explorUrlAction !== ""?
                langAction?
                    <div className="explorURL">
                        <p>Swap success!</p>
                        <a href={explorUrlAction} target="_blank">[ Check in Klaytn scope ]</a>
                    </div>:
                    <div className="explorURL">
                        <p>Swap 성공!</p>
                        <a href={explorUrlAction} target="_blank">[ Klaytn scope에서 확인하기 ]</a>
                    </div>
                : null
            }
        </div>
    )
}

export default SuccessMessage;