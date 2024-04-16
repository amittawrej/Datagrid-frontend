import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from './main';
import DisplayFamilyDetails from './DisplayFamilyDetails';


const FamilyHeadList = () => {
  const [familyHeads, setFamilyHeads] = useState([]);
const [familyDetails, setFamilyDetails] = useState([]);
  useEffect(() => {
    const fetchFamilyHeads = async () => {
      try {
        const response = await axios.get(`${server}/heads`);
        setFamilyHeads(response.data);
      } catch (error) {
        console.error('Error fetching family heads:', error);
      }
    };

    fetchFamilyHeads();
  }, []);

  const handleFamilyCountClick = async (headId) => {
    try {

      const response = await axios.get(`${server}/family/${headId}`);
      
      const data =JSON.stringify(response.data.family, null, 2);
console.log(data);  
const parsedData = JSON.parse(data);
const dataArray = Array.isArray(parsedData) ? parsedData : [parsedData];
console.log(dataArray[0].headOfFamily);
setFamilyDetails(dataArray[0].headOfFamily);    
    } catch (error) {
      console.error('Error fetching family details:', error);
    }
  };

  return (
    <div>
      <h2>Family Heads</h2>
      <ul>
        {familyHeads.map((head, index) => (
          <li key={index}>
            <strong>Head Name:</strong> {head.headName}, 
            <strong> Family Member Count:</strong> 
         
            <span 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => handleFamilyCountClick(head.headId)}
            >
              {head.familyCount}
            </span>
          </li>
        ))}
      </ul>

{<DisplayFamilyDetails familyDetails={familyDetails}/>}
  
      

    </div>
    
  );
};

export default FamilyHeadList;

