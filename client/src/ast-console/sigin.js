import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { ASTConsole } from "./ast-console-login"
import { ConsoleActions } from "./console-action/console-actions"
import { ConsoleSignup } from "./signup"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

export const ConsoleLogin = () => {
    const [gmail, setGmail] = useState()
    const [password, setPassword] = useState()
    const [sigup, setSignup] = useState(false)
    const [load, setLoad] = useState(false)
    const toast = useToast()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const Submit = async () => {
        setLoad(true)
        await ConsoleActions.ConsoleLogin(gmail, password)
            .then((res) => {
                console.log(res?.data)
                if (res?.data?.message) {
                    toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                    setLoad(false)

                    dispatch({
                        type: 'CONSOLE', 
                        payload: {
                          adminEmail:res.data.data.Gmail,
                          adminLoginState:true
                        }
                      });
                   nav("/console/home")

                }
                else {
                    toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                    setLoad(false)
                }
            })
            .catch((e) => {
                toast({ title: e?.name, status: 'error', position: 'bottom-right', isClosable: true })
                setLoad(false)
            })
    }
    return (
        <div style={{ width: '100%', justifyContent: 'space-evenly', display: 'flex' }}>
            {sigup ? <ConsoleSignup change={() => setSignup(false)} />
                : <ASTConsole gmail={(value) => setGmail(value)} password={(value) => setPassword(value)} action={() => Submit()} change={() => setSignup(true)} load={load} />}
        </div>
    )
}