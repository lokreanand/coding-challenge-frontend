import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios'

const AddUser = () => {
    const [validated, setValidated] = useState(false);
    const [userData, setUserData]= useState({
        userId:1,
        title:'',
        body:''
    })
    const onChange = (e) =>{
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const onSubmit = (event) =>{
        event.preventDefault()
        // console.log(userData)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          console.log("5")
          event.preventDefault();
          event.stopPropagation(); 
        }  
        setValidated(true)
        if(userData.title.length!==0){
            // console.log(userData)
            axios.post(`https://jsonplaceholder.typicode.com/posts`,userData).then((res) => {
              window.alert("Data Added Successfully!!")
              console.log(res.data)
            }).catch((e) => {
                window.alert(e.message)
            })
        }
        
    }

  return (
    <div>
        <Form noValidate validated={validated} onSubmit={(e) => onSubmit(e)}>
        
        <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom03">
        
          <Form.Label column sm={2}>Title</Form.Label>
          <Col>
          <Form.Control column sm={10} type="text" name="title" onChange={(e) => onChange(e)} placeholder="Title" required />
          
          <Form.Control.Feedback type="invalid">
            Please provide a valid title.
          </Form.Control.Feedback>
          
          </Col>
        </Form.Group>
        
        <Form.Group as={Row} md="3" className="mb-3" controlId="validationCustom04">
          <Form.Label column sm={2}>Body</Form.Label>
          <Col>
          <Form.Control column sm={10} type="text" name="body" onChange={(e) => onChange(e)} placeholder="Body" required />
          
          
          <Form.Control.Feedback column sm={10} type="invalid">
            Please provide a valid body.
          </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Col className="mb-3" md='11'>
      <Button type="submit">Add User</Button>
      </Col>
        </Form>

    </div>
  )
}

export default AddUser