import { ErrorType } from "../../../actions/types";
import { useAppSelector } from "../../../hooks/hooks";
import "./ErrorMessage.css"


const ErrorMessage = ()=>{
    const errorAction = useAppSelector(state => state.errorMessage)
    return (
        <div  className="errorMessage">
            {errorAction.type !== ErrorType.NoError?
                errorAction.message:
                null
            }
        </div>
    )
}

export default ErrorMessage;