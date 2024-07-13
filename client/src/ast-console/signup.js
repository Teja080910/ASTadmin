import { useToast } from "@chakra-ui/react"
import { ASTConsoleRegister } from "./ast-console-register"
import { ConsoleActions } from "./console-action/console-actions"

export const ConsoleSignup = ({ change }) => {
    const toast = useToast()
    const Submit = async (data) => {
        console.log(data)
        if (data?.email && data?.password && data?.phonenumber && data?.event && data?.start && data?.club && data?.noofpersons) {
            await ConsoleActions.ConsoleRegister(data?.email, data?.password, data?.phonenumber, data?.event, data?.start, data?.club, data?.noofpersons)
                .then((res) => {
                    if (res?.data?.message) {
                        toast({ title: res?.data?.message, status: 'success', position: 'top-right', isClosable: true })
                        setTimeout(() => {
                            window.location.reload(10)
                        }, 1000);
                    }
                    else {
                        toast({ title: res?.data?.error, status: 'error', position: 'bottom-right', isClosable: true })
                    }
                })
                .catch((e) => console.log(e))
        } else {
            toast({ title: "required all fields", status: 'error', position: 'bottom-right', isClosable: true })
        }
    }
    return (
        <ASTConsoleRegister data={(values) => Submit(values)} change={() => change()} />
    )
}