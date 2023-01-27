import React from "react";
import { useState, useEffect } from "react";
import { SECTOR_URL, INPUT_URL } from "../data/backEndLinks";
import MessageModal from "./modal";

import Select from "react-select";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function UserForm() {
  const [options, setOptions] = useState([]);

  const [name, setName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [check, setCheck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  let handleChange = (e) => {
    let val = e.map(sec => {
      return {name: sec.value}
    })
    setSelectedOptions(val);
  };

  let toggleModal = () => setIsOpen(false);

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (name && selectedOptions.length > 0 && check) {
      try {
        let resp = await fetch(
          INPUT_URL,
          {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({username: name, sectors: selectedOptions})
          }
        )
        if (resp.status === 200) {
          setIsOpen(true);
          setMessage("Your response was recorded successfully, to view all the responses go to 'Responses' section. If you want to edit your response, then edit the fields and submit again.")
        }
      } catch(err) {
        setIsOpen(true)
        setMessage("Please check your network!")
      }
    } else {
      setIsOpen(true)
      setMessage("Please fill out all the fields and be agree with the terms and conditions by checking the box!")
    }
  }

  let fetchSectors = async () => {
    let resp = await fetch(SECTOR_URL);
    let data = await resp.json();
    let stData = data.map(sec => {
        return {value: sec.name, label: sec.name}
    });
    setOptions(stData)
  }



  useEffect(() => {
    fetchSectors();
  }, [])

  return (
    <div>
      <Form style={{margin: "5rem", borderRadius: '20px', padding:"2rem", boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)'}} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group style={{marginTop: "3rem"}}>
          <Form.Label>Sectors</Form.Label>
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            placeholder="Select your sectors"
            onChange={handleChange}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicCheckbox" style={{marginTop: "3rem"}}>
          <Form.Check type="checkbox" onChange={(e) => setCheck(e.target.checked)}  label="I agree to the terms and conditions" />
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginTop: "2rem"}}>
          Submit
        </Button>
      </Form>
      <MessageModal 
        isOpen = {isOpen}
        message = {message}
        toggleModal = {toggleModal}
      />
    </div>
  );
}
