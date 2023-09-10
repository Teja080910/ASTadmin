import axios from 'axios';
import 'chart.js/auto';
import React from 'react';
import { Bar } from 'react-chartjs-2';
export const Send=()=>
{
    const data = {
        labels: ['college', 'university', 'student'],
        datasets: [
          {
            label: 'Monthly Sales',
            data: [50, 90, 60],
            backgroundColor: 'rgba(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      }; 
      const Sends=async()=>
      {
        try
        {
          const res=await axios.get('http://localhost:8000/sendotp/'+"6300291529")
        {
            if(res.data)
            {
                console.log(res.data)
            }
        }
        }
        catch(e)
        {
          console.log(e);
        }
      }
      const Verify=async()=>
      {
        try
        {
          const res=await axios.get('http://localhost:8000/reciveotp/'+"272338")
        {
            if(res.data)
            {
                console.log(res.data)
            }
        }
        }
        catch(e)
        {
          console.log(e);
        }
      }
    return (
      <div className="App">
        <button onClick={Sends}>send</button>
        <button onClick={Verify}>verify</button>
        <Bar data={data} />
      </div>
    );
  }
    