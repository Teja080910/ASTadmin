import { useToast } from "@chakra-ui/react"
import { useState } from "react"
import { ASTConsole } from "./ast-console-login"
import { ConsoleActions } from "./console-action/console-actions"
import { ConsoleSignup } from "./signup"

export const ConsoleLogin = () => {
    const [gmail, setGmail] = useState()
    const [password, setPassword] = useState()
    const [sigup, setSignup] = useState(false)
    const toast = useToast()
    const Submit = async () => {
        await ConsoleActions.ConsoleLogin(gmail, password)
            .then((res) => {
                if (res?.data?.message) {
                    toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                }
                else {
                    toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                }
            })
            .catch((e) => console.log(e))
    }
    return (
        <div style={{ width: '100%', justifyContent: 'space-evenly', display: 'flex' }}>
            {sigup ? <ConsoleSignup change={() => setSignup(false)} />
                : <ASTConsole gmail={(value) => setGmail(value)} password={(value) => setPassword(value)} action={() => Submit()} change={() => setSignup(true)} />}
        </div>
    )
}