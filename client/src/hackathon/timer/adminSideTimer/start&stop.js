import { useToast,Button } from "@chakra-ui/react"
import { Actions } from "../../../actions/actions"

export const StartAndStop = ({ timer, start, stop }) => {
    const toast=useToast()
    const StartHackathon = async () => {
        await Actions.Start()
            .then((res) => {
                if (res?.data?.message) {
                    timer="24hrs"
                    start()
                    console.log("set animation")
                } else {
                    toast({ title: res?.data?.error, position: 'bottom-right', status: 'error', isClosable: true })
                }
            })
            .catch((e) => {
                toast({ title: e?.message, position: 'bottom-right', status: 'error', isClosable: true })
            })
    }

    const StopHackathon = async () => {
        await Actions.Stop()
            .then((res) => {
                if (res?.data?.message) {
                    console.log("set animation")
                    stop()
                } else {
                    toast({ title: res?.data?.error, position: 'bottom-right', status: 'error', isClosable: true })
                }
            })
            .catch((e) => {
                toast({ title: e?.message, position: 'bottom-right', status: 'error', isClosable: true })
            })
    }

    return (
        <div className='starthackathon'>
            <Button className='starthackathon-btn' onClick={()=>StartHackathon()}>Start Hackathon</Button>
            <Button className='starthackathon-btn' onClick={()=>StopHackathon()}>Stop Hackathon</Button>
        </div>
    )
}