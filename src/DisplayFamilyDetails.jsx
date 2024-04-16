import React from 'react';

const DisplayFamilyDetails = ({ familyDetails }) => {
  return (
    <div>
      <h2>Family Details</h2>
      <ul>
        {Object.entries(familyDetails).map(([key, value]) => (
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
  );
};

export default DisplayFamilyDetails;
