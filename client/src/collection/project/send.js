import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import pdfToText from 'react-pdftotext';
export const Send = () => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const style = {
    py: 0,
    width: '100%',
    border: '1px solid',
    borderColor: 'divider',
    backgroundColor: 'black',
    color:'white'
  };
  const [load,setLoad]=useState(false)
  const [missionAndVision, setMissionAndVision] = useState('');
  const [file, setFile] = useState();
  const [text1, setText] = useState();
  useEffect(() => {

  }, []);

  const SEND = async () => {
    setLoad(true)
    pdfToText(file)
      .then(async (text) => {
        await axios.post(process.env.REACT_APP_database+"/pdfprint", { text, text1 })
          .then((res) => {
            if (res.data) {
              setMissionAndVision(res.data)
              setLoad(false)
            }
            else {
              setMissionAndVision("Try again")
              setLoad(false)
            }
          })
          .catch((e) => {console.log(e);setLoad(false)})
      })
      .catch(() => console.error("Failed to extract text from pdf"))
  }
  const lines = missionAndVision.split('\n');
  return (
    <div style={{backgroundColor:'black',width:'100%',height:'100vh'}}>
       <div style={{height:"80vh",width:'100%',overflowY:'scroll',display:'grid',justifyContent:'center'}}>
       {lines.map((line, index) => (
        <List sx={style}>
        <ListItem>
          <ListItemText primary={line} key={index} />
        </ListItem>
      </List>
      ))}
       </div>
      <div style={{display:'grid',alignItems:"center",width:"100%",height:"20vh",position:'fixed',bottom:"0"}}>
      <div style={{display:'flex',justifyContent:'center'}}>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        onChange={(e) => setFile(e.target.files[0])}
        style={{marginRight:'1vh'}}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <TextField fullWidth style={{backgroundColor:"white",color:'white',width:"60%"}} label="Enter what you want, file optional if you need upload files" id="fullWidth" onChange={(e) => setText(e.target.value)} />
      </div>
      <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
      <Button variant="contained" endIcon={<SendIcon />} onClick={SEND}>
        {load?"Please wait":"Send"}
      </Button>
      </div>
      </div>
    </div>
  )
}
