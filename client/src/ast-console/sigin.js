import ASTConsole from "./ast-console-login"
import { Motion, Motion1 } from "./styles/motion"

export const ConsoleLogin=()=>{
    return(
        <div style={{width:'100%',justifyContent:'space-evenly',display:'flex'}}>
            {/* <Motion/> */}
            <ASTConsole/>
            {/* <Motion1/> */}
        </div>
    )
}