import { Button, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal ,PopoverArrow,PopoverCloseButton} from "@chakra-ui/react"
export const DeleteTeam = ({dele}) => {
    return (
        <Popover>
            <PopoverTrigger></PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Team Detele</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                    <Button onClick={()=>dele}>Confirm Delete Team</Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}