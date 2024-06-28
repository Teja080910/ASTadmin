import {
    Button,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from '@chakra-ui/react'
import { Actions } from '../../actions/actions'
export const Teams = ({ data,refresh}) => {
    const toast=useToast()
    const Delete=async(team)=>{
        await Actions.DeleteTeam(team)
        .then((res)=>{
            if(res?.data?.message){
                refresh()
                toast({title:'delete',position:'top-right',status:'success',isClosable:true})
            }
        })
    }
    return (
        <div className='teamstable'>
            <TableContainer width={"80%"}>
                <Table variant='simple'>
                    <TableCaption>Hacthon Teams</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Team Code</Th>
                            <Th>Team Name</Th>
                            <Th>Members</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.map((team) => (
                                <Tr key={team}>
                                    <Td>{team?.TeamCode}</Td>
                                    <Td>{team?.Team}</Td>
                                    <Td>{team?.Members}</Td>
                                    <Td>
                                        {team?.Team&&<Button bg={'red'} color={'white'} onClick={()=>Delete(team?.TeamCode)}>Select</Button>}
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}