import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Body.css";
import NavBar from "./Nav";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [localState, setLocalState] = useState(""); // Local state for the form
  const Navigate = useNavigate()

  const handleStateChange = (event) => {
    setLocalState(event.target.value); // Update local state when user selects a state
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("selectedState", localState);
    Navigate(`/${localState}`)
    console.log("Form submitted with state:", localState);
    
    //save the dynamonic routing in local memory 
  };

  return (
    <>
    <NavBar />
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Form onSubmit={handleSubmit} className="custom-form">
            <Form.Group controlId="formState">
              <Form.Label className="form-label">Select State</Form.Label>
              <Form.Select
                onChange={handleStateChange}
                value={localState}
                className="form-select"
              >
                <option value="">Select State</option>
                <option value="Andaman and Nicobar Islands">
                  Andaman and Nicobar Islands
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haveli">
                  Dadra and Nagar Haveli
                </option>
                <option value="Daman and Diu">Daman and Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Telangana">Telangana</option>
                <option value="Ladakh">Ladakh</option>
              </Form.Select>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit" className="custom-button">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
};
export default HomePage;
