import { Button, SimpleGrid } from '@chakra-ui/react'
import './application.css'
import {useNavigate} from 'react-router-dom'
export const Applications = () => {
    const nav=useNavigate()
    return (
        <>
            <div className='appcontainer'>
                <SimpleGrid minChildWidth='200px' spacing='40px'>
                    <Button onClick={()=>{window.location.href=("https://ast-certificates.vercel.app/")}}></Button>
                    <Button onClick={()=>nav("chatwithme")}></Button>
                    <Button onClick={()=>{window.location.href="https://notegroup.vercel.app/"}}></Button>
                    <Button></Button>
                </SimpleGrid>
            </div>
        </>
    )
}