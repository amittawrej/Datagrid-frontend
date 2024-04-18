import React from 'react';

const DisplayFamilyDetails = ({ familyDetails,memberDetails }) => {
  console.log(memberDetails);
  return (
    <div>
      
      <h2>Head Details</h2>
      <ul>
      {/* it iterates over the key-value pairs of the familyDetails object using Object.entries(). */}
        {Object.entries(familyDetails).map(([key, value]) => (
          <li key={key}>
            {/* checks value is array  */}
            <strong>{key}:</strong> {Array.isArray(value) ? (     
              <ul>
                {value.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : value}
          </li>
        ))}
      </ul>
      <h2>Member Details</h2>
      <ul>
      {memberDetails.map((member, memberIndex) => (
  <div key={memberIndex}>
    <h3>Member {memberIndex + 1}</h3>
    <ul>
      {Object.entries(member).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {Array.isArray(value) ? (
            <ul>
              {value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : value}
        </li>
      ))}
    </ul>
  </div>
))}

      </ul>
    </div>
  );
};

export default DisplayFamilyDetails;
