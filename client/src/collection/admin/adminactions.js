import { useDispatch } from "react-redux"
import { Actions } from "../../actions/actions"
import { useToast } from "@chakra-ui/react";
import CryptoAES from 'crypto-js/aes';

export const BootLogin=async(mail,password)=>{
    const dispatch=useDispatch();
    const toast=useToast()
    await Actions.BootAdminLogin(mail,password)
    .then((res)=>{
      if(res?.data?.message){
        dispatch({ type: 'LOGIN', payload: { bootmail: res?.data?.Gmail} });
        dispatch({ type: 'LOGIN', payload: { bootpassword:CryptoAES.encrypt(res?.data?.Password,res?.data?.Gmail).toString()} });
        toast({title:res?.data?.message,status:'success',position:'top-right',isClosable:true})
        return true
      }
      if(res?.data?.error){
        toast({title:res?.data?.error,status:'error',position:'bottom-right',isClosable:true})
        return false
      }
    })
  }