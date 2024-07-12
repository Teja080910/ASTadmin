import { useToast ,Button} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Actions } from '../../actions/actions';
import { FeedbackForm } from '../../bootcamp/others/feedbackform/feedbackform';
import './others.css';

export const Others = () => {
  const [searchRegNoActivities, setActivities] = useState();
  const [marksActivities, setMarksActivities] = useState('');
  const [searchRegNoInternal, setInternal] = useState('');
  const [marksInternal, setMarksInternal] = useState('');
  const [data, setData] = useState()
  const [load, setLoad] = useState(false)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const toast = useToast()

  const handleSaveActivities = async () => {
    setLoad((state) => ({ ...state, searchRegNoActivities: true }))
    await Actions.ActivityMarks(searchRegNoActivities, marksActivities)
      .then((res) => {
        if (res?.data?.message) {
          Students()
          setMarksActivities('')
          setLoad((state) => ({ ...state, searchRegNoActivities: false }))
          toast({ title: res?.data?.message, position: 'top-right', status: 'success', isClosable: true })
        }
        if (res?.data?.error) {
          setLoad((state) => ({ ...state, searchRegNoActivities: false }))
          toast({ title: res?.error?.message, position: 'bottom-right', status: 'error', isClosable: true })
        }
      })
      .catch((e) => {
        setLoad((state) => ({ ...state, searchRegNoActivities: false }))
        toast({ title: e?.message, position: 'bottom-right', status: 'error', isClosable: true })
      })
  };

  const handleSaveInternal = async () => {
    setLoad((state) => ({ ...state, searchRegNoInternal: true }))
    await Actions.InternalMarks(searchRegNoInternal, marksInternal)
      .then((res) => {
        if (res?.data?.message) {
          Students()
          setMarksInternal('')
          setLoad((state) => ({ ...state, searchRegNoInternal: false }))
          toast({ title: res?.data?.message, position: 'top-right', status: 'success', isClosable: true })
        }
        if (res?.data?.error) {
          setLoad((state) => ({ ...state, searchRegNoInternal: false }))
          toast({ title: res?.error?.message, position: 'bottom-right', status: 'error', isClosable: true })
        }
      })
      .catch((e) => {
        setLoad((state) => ({ ...state, searchRegNoInternal: false }))
        toast({ title: e?.message, position: 'bottom-right', status: 'error', isClosable: true })
      })
  };

  const Students = async () => {
    await Actions.Students().then((res) => setData(res?.data)).catch((e) => console.log(e))
  }

  useEffect(() => {
    Students()
  }, [])

    const submitFeedback = () => {
    setShowFeedbackForm(true); 
  };


  return (
    <div className="others-container">
      <div className="marks-entry">
        <h2>Activities</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Register Number or Name"
            value={searchRegNoActivities}
            onChange={(e) => setActivities(e.target.value.toUpperCase())}
          />
        </div>
        {searchRegNoActivities && <div className="search-section">
          {
            data?.filter(user => user?.Name?.includes(searchRegNoActivities) || user?.Reg_No?.includes(searchRegNoActivities))?.map((student) => (
              <div>
                <p onClick={()=>setActivities(student?.Reg_No)}>{student?.Name}</p>
                <p>{student?.ActivityMarks}</p>
              </div>
            ))
          }
        </div>}
        <div className="marks-section">
          <input
            type="text"
            placeholder="Enter Marks"
            value={marksActivities}
            onChange={(e) => setMarksActivities(e.target.value)}
          />
          <button onClick={handleSaveActivities}>{load.searchRegNoActivities ? "Saving...." : "Save"}</button>
        </div>
      </div>

      <div className="marks-entry">
        <h2>Internal Marks</h2>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search Register Number or Name"
            value={searchRegNoInternal}
            onChange={(e) => setInternal(e.target.value.toUpperCase())}
          />
        </div>
        {searchRegNoInternal && <div className="search-section">
          {
            data?.filter(user => user?.Name?.includes(searchRegNoInternal) || user?.Reg_No?.includes(searchRegNoInternal))?.map((student) => (
              <div>
                <p onClick={()=>setInternal(student?.Reg_No)}>{student?.Name}</p>
                <p>{student?.InternalMarks}</p>
              </div>
            ))
          }
        </div>}
        <div className="marks-section">
          <input
            type="text"
            placeholder="Enter Marks"
            value={marksInternal}
            onChange={(e) => setMarksInternal(e.target.value)}
          />
          <button onClick={handleSaveInternal}>{load.searchRegNoInternal ? "Saving...." : "Save"}</button>
        </div>
      </div>
      <div className='feedback-align'>
        
        <Button className='animate__animated animate__lightSpeedInRight feedbackform' onClick={submitFeedback} colorScheme='cyan'>Give Feedback</Button>
        
        {showFeedbackForm && <FeedbackForm />} 
        </div>
    </div>

  );
};

