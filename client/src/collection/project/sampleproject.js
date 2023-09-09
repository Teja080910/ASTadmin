import axios from "axios";
import React, { useEffect, useState } from "react";
export const Pro=()=>
{
    const [name,sname]=useState([]);
    const [id,sid] = useState([]);
      const ifs={
        'Content-Type': 'multipart/form-data',
        pinata_api_key: '84593997d1fe90647d34',
        pinata_secret_api_key: '8287ac32ec3cb186e74cc02904340906275878f893f1713e8a9b60b0658f7858',
      }
     
    const Submit=async()=>
    {
        const formData = new FormData();
        formData.append('file', name);
        try
        {
            const ipfsResponse = await axios.post(
                'https://api.pinata.cloud/pinning/pinFileToIPFS',
                formData,
                {
                  headers:ifs,
                }
              );
              const link=ipfsResponse.data.IpfsHash;
            const res = await axios.post('http://localhost:8000/pro',{link})
            if(res)
            {
                alert("sucess");
            }
        }
        catch(e)
        {
            console.log(e);
        }
    }
    useEffect(()=>
    {
        axios.get("http://localhost:8000/pro")
        .then((result)=>
        {
            sid(result.data);
        })
    },[])
    return(
        <>
        {/* <input type="text" placeholder="paste link" onChange={(e)=>{slink(e.target.value)}}></input> */}
        {/* <input type="text" placeholder="name" onChange={(e)=>{sname(e.target.value)}}></input> */}
        <input type="file" onChange={(event)=>{sname(event.target.files[0])}}/>
        <button onClick={Submit}>Submit</button>
        <div>
            {
                id.map((val,index)=>
                (
                    <>
                         <img src={"https://jade-potential-cheetah-339.mypinata.cloud/ipfs/"+val.Link} width="50%" height="50%"/>
            </>
                ))
            }
        </div>
        </>
    )
}