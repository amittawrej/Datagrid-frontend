import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { server } from "./main";
const FamilyForm = () => {
  const [headOfFamily, setHeadOfFamily] = useState({
    name: "",
    surname: "",  
    birthdate: "",
    mobileNo: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    maritalStatus: "",
    weddingDate: "",
    hobbies: [], 
  });
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleHeadChange = (e) => {
    const { name, value } = e.target;
    if (name === "hobbies") {
      // Split the string into an array of hobbies
      setHeadOfFamily((prevState) => ({
        ...prevState,
        [name]: value.split(",").map((hobby) => hobby.trim()),
      }));
    } else {
      setHeadOfFamily((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMemberChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMembers = [...familyMembers];
    updatedMembers[index][name] = value;
    setFamilyMembers(updatedMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers((prevState) => [
      ...prevState,
      {
        name: "",
        birthdate: "",
        maritalStatus: "",
        weddingDate: "",
        education: "",
        photo: "",
      },
    ]);
  };
const addHobby = () => {
    setHeadOfFamily((prevState) => ({
      ...prevState,
      hobbies: [...prevState.hobbies, ""], 
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headBirthDate = new Date(headOfFamily.birthdate);
      const today = new Date();
      const ageDifference = today.getFullYear() - headBirthDate.getFullYear();
      const monthsDifference = today.getMonth() - headBirthDate.getMonth();
      const daysDifference = today.getDate() - headBirthDate.getDate();
  
      const headAge = monthsDifference < 0 || (monthsDifference === 0 && daysDifference < 0)
        ? ageDifference - 1
        : ageDifference;
  
   
      if (headAge < 21) {
       
        alert("Age of the head of the family should be above 21 years.");
        return;
      }
  
      const response = await axios.post(`${server}/family`, {
        headOfFamily,
        familyMembers,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
     
      <h2>Head of the Family</h2>
      <input
        className="inputStyle"
        type="text"
        name="name"
        value={headOfFamily.name}
        onChange={handleHeadChange}
        required
        placeholder="Name"
      />
      <input
        className="inputStyle"
        type="text"
        name="surname"
        value={headOfFamily.surname}
        onChange={handleHeadChange}
        required
        placeholder="Surname"
      />
      <span>Birth Date</span>
      <input
        className="inputStyle"
        type="date"
        name="birthdate"
        value={headOfFamily.birthdate}
        onChange={handleHeadChange}
        required
        placeholder="Birthdate"
      />
      <input
        className="inputStyle"
        type="text"
        name="mobileNo"
        value={headOfFamily.mobileNo}
        onChange={handleHeadChange}
        required
        placeholder="Mobile No"
      />
      <input
        className="inputStyle"
        type="text"
        name="address"
        value={headOfFamily.address}
        onChange={handleHeadChange}
        required
        placeholder="Address"
      />
      <input
        className="inputStyle"
        type="text"
        name="state"
        value={headOfFamily.state}
        onChange={handleHeadChange}
        required
        placeholder="State"
      />
      <input
        className="inputStyle"
        type="text"
        name="city"
        value={headOfFamily.city}
        onChange={handleHeadChange}
        required
        placeholder="City"
      />
      <input
        className="inputStyle"
        type="text"
        name="pincode"
        value={headOfFamily.pincode}
        onChange={handleHeadChange}
        required
        placeholder="Pincode"
      />
      <select
        name="maritalStatus"
        value={headOfFamily.maritalStatus}
        onChange={handleHeadChange}
        required
      >
        <option value="">Select Marital Status</option>
        <option value="Married">Married</option>
        <option value="Unmarried">Unmarried</option>
      </select>
      {headOfFamily.maritalStatus === "Married" && (
        <input
          type="date"
          name="weddingDate"
          value={headOfFamily.weddingDate}
          onChange={handleHeadChange}
          required
          placeholder="Wedding Date"
        />
      
      )}
        <input
        type="text"
        name="hobbies"
        value={headOfFamily.hobbies.join(", ")}
        onChange={(e) => handleHeadChange(e)}
        placeholder="Hobbies (Separate by commas)"
      />
      <button type="button" onClick={addHobby}>
        Add Hobby
      </button>

      <h2>Family Members</h2>
      {familyMembers.map((member, index) => (
        <div key={index}>
          <h3>Family Member {index + 1}</h3>
          <input
            className="input"
            type="text"
            name="name"
            value={member.name}
            onChange={(e) => handleMemberChange(e, index)}
            required
            placeholder="Name"
          />
          <span>Birth Date</span>

          <input
            type="date"
            name="birthdate"
            value={member.birthdate}
            onChange={(e) => handleMemberChange(e, index)}
            required
            placeholder="Birthdate"
          />
          <input
            type="text"
            name="mobileNo"
            value={member.mobileNo}
            onChange={(e) => handleMemberChange(e, index)}
            required
            placeholder="Mobile No"
          />

          <select
            name="maritalStatus"
            value={member.maritalStatus}
            onChange={(e) => handleMemberChange(e, index)}
            required
          >
            <option value="">Select Marital Status</option>
            <option value="Married">Married</option>
            <option value="Unmarried">Unmarried</option>
          </select>
          {member.maritalStatus === "Married" && (
        <input
          type="date"
          name="weddingDate"
          value={member.weddingDate}
          onChange={(e)=> handleMemberChange(e, index)}
          placeholder="Wedding Date"
        />
      
      )}
          <input
            type="text"
            name="education"
            value={member.education}
            onChange={(e) => handleMemberChange(e, index)}
       
            placeholder="Education"
          />
          <input
            type="file"
            name="photo"
            accept="image/*" 
            onChange={(e) => handleMemberChange(e, index)}
          
            style={{ marginBottom: "10px" }}
          />
        </div>
      ))}
      <button type="button" onClick={addFamilyMember}>
        Add Family Member
      </button>


      <button type="submit">Submit</button>
    </form>
  );
};

export default FamilyForm;

