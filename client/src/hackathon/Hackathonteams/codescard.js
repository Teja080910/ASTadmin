import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Input, useToast } from '@chakra-ui/react'
import { Actions } from '../../actions/actions'
import { useState } from 'react'
export const CodesCard = () => {
    const toast=useToast()
    const [size,setSize]=useState();
    const [isLoading,setIsLoading]=useState(false)
    const Submit=async()=>{
        setIsLoading(true)
        await Actions.inputTeams(size)
        .then((res)=>{
            setIsLoading(false)
            if(res?.data?.message){
                setSize('')
                toast({title:res?.data?.message,status:'success',position:'top-right',isClosable:true})
            }
        })
        .catch((e)=>{
            console.log(e);
            setIsLoading(false)
            toast({title:e?.message,status:'error',position:'bottom-right',isClosable:true})
        })
    }
    return (
        <div className='codescard'>
            <Card width={'50%'}>
                <CardHeader>
                    <Heading size='sm'>Add Team Codes</Heading>
                </CardHeader>
                <CardBody >
                    <Input size='md' id='codesinput' value={size} type='number' placeholder='Enter Number Of Teams' onChange={(e)=>setSize(e.target.value)}/>
                </CardBody>
                <CardFooter style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button colorScheme='blue' onClick={Submit}>{isLoading?"Submitting":"Submit"}</Button>
                </CardFooter>
            </Card>
        </div>
    )
}