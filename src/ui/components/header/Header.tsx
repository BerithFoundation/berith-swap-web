import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import "./Header.css"
import { setIsEng } from "../../../store/LanguageStore";
import { setErrorMessage } from "../../../store/ErrorMessageStore";

function Header () {
    const langAction = useAppSelector(state => state.language.isEng);
    const errorMsgAction = useAppSelector(state => state.errorMessage);
    const dispatch = useAppDispatch();

    const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value === "KOR"){
            dispatch(setIsEng(false))
            dispatch(setErrorMessage({err:errorMsgAction.type,isEng:false}))
        }else{
            dispatch(setIsEng(true))
            dispatch(setErrorMessage({err:errorMsgAction.type,isEng:true}))
        }
    }

    return(
        <div className="Header_wrap">
            <a href={langAction?"https://berith.co/en":"https://berith.co/kr"} target="_blank">
                <img className="Header_logo" src="/assets/berith_logo.png" alt='Berith'/>
            </a>
            <select className="Header_select" onChange={handleChangeLang}>
                <option selected>KOR</option>
                <option>ENG</option>
            </select>
        </div>
    )
}

export default Header;