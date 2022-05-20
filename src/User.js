import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap';
import AddUser from './AddUser';
// import MapComponent from './Map';

const User = () => {
    const [validated, setValidated] = useState(false);
    const [id,setId]=useState('')
    const [allUsers,setAllUsers]=useState([])
    // const [lng,setLng]=useState(-70.9)
    // const [lat,setLat]=useState(42.5)
    const navigate=useNavigate()
    let userData={}
    let menuItem = allUsers.map((user,i)=>{
        return (
            <option key={i} value={user.id}>{user.name}</option>
          )
    })

    useEffect(()=>{
        async function getUser(){
          const result= await axios.get(`https://jsonplaceholder.typicode.com/users`)
          setAllUsers(result.data)
          console.log(result.data)
        }
        getUser()
      },[])

    const onChange = (e) => {
        setId(e.target.value)
        
    }
    async function onSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          console.log("5")
          event.preventDefault();
          event.stopPropagation(); 
        }
          
          setValidated(true)
          if(id.length!==0){
          await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res)=>{
            userData=res.data

        }).catch((e)=>{
            window.alert(e.message)
        })
        // window.open(`https://maps.google.com?q=+${userData.address.geo.lat}+,+${userData.address.geo.lng}`)
        navigate('/showmap',{state:{lat:userData.address.geo.lat,lng:userData.address.geo.lng}})
        // setLng(userData.address.geo.lng)
        // setLat(userData.address.geo.lat)
        // console.log(userData.address)
          }
        
    }
    
    
  return (
    <div>
    <Form noValidate validated={validated} onSubmit={(e) => onSubmit(e)}>
    <br/>
    <br/>
    <Form.Group as={Row} className="mb-3" md='3' controlId="validationCustom01">
    
    <Form.Label column sm={2}>Select a user</Form.Label>
    <Col>
    <Form.Select column sm={10} value={id} onChange={(e) => onChange(e)} required>
    <option disabled value="">Select</option>
    {menuItem}
    </Form.Select>
      <Form.Control.Feedback type="invalid">
            Please select a user.
      </Form.Control.Feedback>
    </Col>
    </Form.Group>
    {/* <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="email" placeholder="Enter email" /> */}
    
  {/* </Form.Group> */}
  
  
    <Col md='11'>
      <Button type="submit">Submit</Button>
    </Col>
  
    {/* {selected?<MapComponent lat={address.geo.lat} lng={address.geo.lng} />:<User />} */}
    </Form>
    <br/>
    <AddUser />
    
    </div>
  )
}

export default User