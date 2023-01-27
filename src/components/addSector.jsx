import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { SECTOR_URL } from "../data/backEndLinks";

const AddSector = () => {
    const [secName, setSecName] = useState("");
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let resp = await fetch(
                SECTOR_URL,
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({name: secName})
                }
            );
            if (resp.status === 200) {
                setSecName("");
                alert("Sector Added");
            } else {
                alert("some error occured!");
            }
        } catch (err) {
            alert("Check your network!")
        }    
    }
    
    return (
        <Form style={{margin: "5rem", borderRadius: '20px', padding:"2rem", boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)'}} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Sector Name</Form.Label>
                <Form.Control type="text" required placeholder="Enter sector name" onChange={(e) => setSecName(e.target.value)} value={secName}/>
            </Form.Group>

            <Button variant="primary" type="submit" style={{marginTop: "2rem"}} >
                Add Sector
            </Button>
        </Form>
    );
}

export default AddSector;