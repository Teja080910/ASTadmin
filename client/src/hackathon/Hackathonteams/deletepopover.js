import { Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, Portal, Input, useToast } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useState } from "react"

const TeamDeletePopover = ({ team, Delete }) => {
    const [teamCode, setTeamCode] = useState("")
    const toast = useToast();

    const handleDelete = () => {
        if (parseInt(teamCode) === parseInt(team?.TeamCode)) {
            Delete(team?.TeamCode)
            setTeamCode("")
        } else {
           toast({
            title:"Delete Team failed",
            description:"Team code not matched",
            position:"top-right",
            colorScheme:"orange"
           })
            console.log("Incorrect team code entered")
        }
    }

    return (
        <Popover>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader align="center">Team Delete</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody justifyContent="center" display={"flex"} style={{flexDirection:"column"}} gap={3}>
                        <Input
                            placeholder='Enter team code to delete'
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                        />
                        <Button bg={'red'} color={'white'} onClick={handleDelete}>Confirm Delete Team</Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
            <PopoverTrigger>
                <Button bg={'red'} color={'white'} size="sm"><DeleteIcon /></Button>
            </PopoverTrigger>
        </Popover>
    )
}

export default TeamDeletePopover
