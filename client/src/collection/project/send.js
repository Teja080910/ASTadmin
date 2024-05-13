import { Button, ListItem, Textarea, UnorderedList } from '@chakra-ui/react';
import { VisuallyHiddenInput } from '@chakra-ui/react';
import { faCloudUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import pdfToText from 'react-pdftotext';
export const Send = () => {
  const [load, setLoad] = useState(false)
  const [missionAndVision, setMissionAndVision] = useState('');
  const [file, setFile] = useState();
  const [text1, setText] = useState();
  useEffect(() => {

  }, []);

  const SEND = async () => {
    setLoad(true)
    pdfToText(file)
      .then(async (text) => {
        await axios.post(process.env.REACT_APP_database + "/pdfprint", { text, text1 })
          .then((res) => {
            if (res.data) {
              setMissionAndVision(res.data)
              setText(' ')
              setLoad(false)
            }
            else {
              setMissionAndVision("Try again")
              setLoad(false)
            }
          })
          .catch((e) => { console.log(e); setLoad(false) })
      })
      .catch(() => console.error("Failed to extract text from pdf"))
  }
  const lines = missionAndVision?.split('\n');
  console.log(lines.length)
  return (
    <div style={{ backgroundColor: 'black', width: '100%', height: '100vh',justifyContent:"center",display:"flex" }}>
      <div style={{ height: "80vh", width: '70%', overflowY:lines.length>10&&'scroll',marginTop:"5%",color:"white" }}>
        {lines?.map((line, index) => (
          <UnorderedList>
            <ListItem key={index}>{line}</ListItem>
          </UnorderedList>
        ))}
      </div>
      <div style={{ display: 'grid', alignItems: "center", width: "100%", height: "20vh", position: 'fixed', bottom: "0" }}>
        <div style={{ display: 'flex', justifyContent: 'center', color: "white" }}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<FontAwesomeIcon icon={faCloudUpload} style={{ color: 'blue', backgroundColor: 'blue' }} />}
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginRight: '1vh' }}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Textarea fullWidth value={text1} style={{ backgroundColor: "white", color: 'black', width: "60%" }} placeholder="Enter what you want, file optional if you need upload files" id="fullWidth" onChange={(e) => setText(e.target.value)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={(e) => setText(' ')}>Delete</Button>
          <Button onClick={SEND}>{load ? "Please wait" : "Send"}</Button>
        </div>
      </div>
    </div>
  )
}
