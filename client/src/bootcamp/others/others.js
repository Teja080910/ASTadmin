import { useToast, Spinner, Box, Input, Button, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Actions } from '../../actions/actions';
import './others.css';

export const Others = () => {
  const [searchRegNoActivities, setActivities] = useState('');
  const [marksActivities, setMarksActivities] = useState('');
  const [searchRegNoInternal, setInternal] = useState('');
  const [marksInternal, setMarksInternal] = useState('');
  const [data, setData] = useState([]);
  const [load, setLoad] = useState({ activities: false, internal: false });
  const toast = useToast();

  const handleSaveActivities = async () => {
    setLoad((state) => ({ ...state, activities: true }));
    try {
      const res = await Actions.ActivityMarks(searchRegNoActivities, marksActivities);
      if (res?.data?.message) {
        await fetchStudents();
        setMarksActivities('');
        toast({ title: res.data.message, position: 'top-right', status: 'success', isClosable: true });
      } else if (res?.data?.error) {
        toast({ title: res.data.error.message, position: 'bottom-right', status: 'error', isClosable: true });
      }
    } catch (e) {
      toast({ title: e.message, position: 'bottom-right', status: 'error', isClosable: true });
    } finally {
      setLoad((state) => ({ ...state, activities: false }));
    }
  };

  const handleSaveInternal = async () => {
    setLoad((state) => ({ ...state, internal: true }));
    try {
      const res = await Actions.InternalMarks(searchRegNoInternal, marksInternal);
      if (res?.data?.message) {
        await fetchStudents();
        setMarksInternal('');
        toast({ title: res.data.message, position: 'top-right', status: 'success', isClosable: true });
      } else if (res?.data?.error) {
        toast({ title: res.data.error.message, position: 'bottom-right', status: 'error', isClosable: true });
      }
    } catch (e) {
      toast({ title: e.message, position: 'bottom-right', status: 'error', isClosable: true });
    } finally {
      setLoad((state) => ({ ...state, internal: false }));
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await Actions.Students();
      setData(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredData = (search) => {
    return data.filter(user => 
      user.Name.includes(search.toUpperCase()) || 
      user.Reg_No.includes(search.toUpperCase())
    );
  };

  return (
    <div className="others-container">
      <Box className="marks-entry">
        <h2>Activities</h2>
        <Box className="search-section">
          <Input
            type="text"
            placeholder="Search Regd No. or Name"
            value={searchRegNoActivities}
            onChange={(e) => setActivities(e.target.value)}
          />
          {load.activities && <Spinner />}
          {searchRegNoActivities && (
            <>
              <Box className={`search-results ${searchRegNoActivities.length === 10 && 'onselect'}`} boxShadow="xl" bgColor="white">
                {filteredData(searchRegNoActivities).length > 0 ? (
                  filteredData(searchRegNoActivities).map((student) => (
                    <Box key={student.Reg_No} onClick={() => setActivities(student.Reg_No)}>
                      <Text>{student.Name} :: {student.ActivityMarks ||0}</Text>
                    </Box>
                  ))
                ) : (
                  <Text>No results found</Text>
                )}
              </Box>
              {searchRegNoActivities.length === 10 && filteredData(searchRegNoActivities).length > 0 && filteredData(searchRegNoActivities).map((student) => (
                <Box key={student.Reg_No} onClick={() => setActivities(student.Reg_No)}>
                  <Text>{student.Name} :: {student.ActivityMarks ||0}</Text>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box className="marks-section">
          <Input
            type="text"
            placeholder="Enter Marks"
            value={marksActivities}
            onChange={(e) => setMarksActivities(e.target.value)}
            disabled={load.activities}
          />
          <Button onClick={handleSaveActivities} isLoading={load.activities} colorScheme='pink'>
            {load.activities ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>

      <div className="marks-entry">
        <h2>Internal Marks</h2>
        <Box className="search-section">
          <Input
            type="text"
            placeholder="Search Regd No. or Name"
            value={searchRegNoInternal}
            onChange={(e) => setInternal(e.target.value)}
          />
          {load.internal && <Spinner />}
          {searchRegNoInternal && (
            <>
              <Box className={`search-results ${searchRegNoInternal.length === 10 && 'onselect'}`} boxShadow="xl" bgColor="white">
                {filteredData(searchRegNoInternal).length > 0 ? (
                  filteredData(searchRegNoInternal).map((student) => (
                    <Box key={student.Reg_No} onClick={() => setInternal(student.Reg_No)}>
                      <Text>{student.Name} :: {student.InternalMarks || 0} </Text>
                    
                    </Box>
                  ))
                ) : (
                  <Text>No results found</Text>
                )}
              </Box>
              {searchRegNoInternal.length === 10 && filteredData(searchRegNoInternal).length > 0 && filteredData(searchRegNoInternal).map((student) => (
                <Box key={student.Reg_No} onClick={() => setInternal(student.Reg_No)}>
                  <Text>{student.Name} :: {student.InternalMarks || 0} </Text>
                 
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box className="marks-section">
          <Input
            type="text"
            placeholder="Enter Marks"
            value={marksInternal}
            onChange={(e) => setMarksInternal(e.target.value)}
            disabled={load.internal}
          />
          <Button onClick={handleSaveInternal} isLoading={load.internal}  colorScheme='pink'>
            {load.internal ? "Saving..." : "Save"}
          </Button>
        </Box>
      </div>
    </div>
  );
};
