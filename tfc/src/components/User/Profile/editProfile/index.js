import React, { Component, useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import './style.css';
import FileUploadButton from '../../Register/FileUploadButton/index'
import axios from 'axios';
// Reference: https://codepen.io/rickyeckhardt/pen/oNXeoZp
import { useNavigate } from "react-router-dom"
// const FormData = require('form-data');

const EditProfile = () => {
    const [avatar, setAvatar] = useState(null);

    const [data, setData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: "",
        avatar: "",
        phone_number: ""
    })

    // const [file, setFile] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const noErrors = useRef(false);
    // const [noErrors, setNoErrors] = useState(false)

    // function RegistrationForm(e) {
    //     const fields={...data}
    //     fields[e.target.id] = e.target.value
    //     if (fields['Avatar'] === "") {
    //         fields.Avatar = null
    //     }
    //
    //     if (e.target.id === "Avatar"){
    //         console.log("avatar")
    //             setFile(e.target.files[0])
    //             formData.append('file', file);
    //     }
    //     setData(fields)
    //     // console.log(fields)
    //     formData.append(e.target.id, fields[e.target.id])
    // }

    function RegistrationForm(e) {
        const fields={...data}
        fields[e.target.id] = e.target.value
        if (fields['Avatar']  === "") {
            fields['Avatar'] = null
        }
        setData(fields)
        // console.log(fields)
    }

    // function RegistrationForm(e) {
    //     const fields={...data}
    //     fields[e.target.id] = e.target.value
    //     if (fields['avatar'] === "") {
    //         formData.append('avatar', null)
    //     }
    //
    //     if (e.target.id === "avatar"){
    //         console.log("avatar")
    //         setAvatar(e.target.files[0])
    //         formData.append('avatar', avatar);
    //     }
    //     setData(fields)
    //     // console.log(e.target.id, data[e.target.id])
    //     Object.keys(fields).forEach(key => formData.append(key, fields[key]))
    //     // formData.append(e.target.id, fields[e.target.id])
    //     // console.log(fields)
    //     for (var pair of formData.entries()) {
    //         console.log(pair[0]+ ', ' + pair[1]);
    //     }
    // }
    function submitForm(e) {
    // const submitForm =async(e) => {
        e.preventDefault();
        const url = "http://127.0.0.1:8000/accounts/register/";
        // let fd = new FormData();
        // const obj = {
        //     username: data.Username,
        //     first_name: data.FirstName,
        //     last_name: data.LastName,
        //     email: data.Email,
        //     password: data.Password,
        //     repeat_password: data.RepeatPassword,
        //     avatar: formData,
        //     phone_number: data.PhoneNumber
        // }
        // Object.keys(obj).forEach(key => console.log(key, obj[key]))
        // Object.keys(obj).forEach(key => fd.append(key, obj[key]))
        // data = formData
        // console.log(formData.values())


        //     await axios({
        //         method: "post",
        //         url: url,
        //         data: formData
        //     })
        //         .then(response => handleErrors(response))
        //         .catch(err => my_function(err.response.data));
        // }

        axios.post(url, {
            username: data.username,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
            repeat_password: data.repeat_password,
            avatar: data.avatar,
            phone_number: data.phone_number
        }, {headers: { "Content-Type": "multipart/form-data" }})
            .then(response => handleErrors(response))
            .catch(err => my_function(err.response.data))
    }

    function my_function(e) {
        let keys = Object.keys(e)
        get_errors2(keys, e)
    }


    // setState({...this.state.data, Avatar: file});

    function handleErrors(response){
        setFormErrors({})

        let k = Object.keys(response.data)
        // // let k2 = Object.keys(response)
        // console.log(response)
        // console.log(k2)
        // console.log(response)
        // console.log(k)
        if (k.includes('response')) {
            console.log(response.data)
            noErrors.current = true
            // setNoErrors(true)
            console.log("1")
            if (noErrors) {
                console.log("2")
                navigate('/login')
                noErrors.current = false
            }

        } else {
            get_errors(k, response.data)
        }
        // console.log("err", noErrors)
    }


    function get_errors2(keys, data){
        let errors = {}
        for (let i = 0; i < keys.length; i++){
            let k = keys[i]
            errors[k] = data[k]
        }
        setFormErrors(errors);
        return errors
    }

    function get_errors(keys, data){
        let errors = {}
        for (let i = 0; i < keys.length; i++){
            let k = keys[i]
            errors[k] = data[k][0]
        }
        setFormErrors(errors);
        return errors
    }

    const navigate = useNavigate();

    return (
    <div className='edit-profile'>
        <div className="row">
  <section className="section">
    <header>
      <h3>Register</h3>
      <h4>Please fill your information below</h4>
    </header>
    <main>
      <form onSubmit={(e) => submitForm(e)}>
        <div  className="form-item box-item">
          <input id="username" type="text" placeholder="Username" onChange={(e) => RegistrationForm(e)} value={data.Username} data-required/>
          {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
            <span>{formErrors['username']}</span>
        </div>
        <div className="form-item box-item">
          <input id="first_name" type="text" onChange={(e) => RegistrationForm(e)} placeholder="First Name" value={data.FirstName} data-required/>
          {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
            <span>{formErrors['first_name']}</span>
        </div>

        <div className="form-item box-item">
          <input id="last_name" type="text" name="text" onChange={(e) => RegistrationForm(e)} placeholder="Last Name" value={data.LastName} data-required/>
          {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
            <span>{formErrors['last_name']}</span>
        </div>
        <div className="form-item box-item">
          <input id="email" type="email" onChange={(e) => RegistrationForm(e)} placeholder="Email" value={data.Email} data-email data-required/>
          {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
          {/*<small className="errorEmail"><i className="fa fa-asterisk" aria-hidden="true"></i> email is not valid</small>*/}
            <span>{formErrors['email']}</span>
        </div>
          <div className="form-item box-item">
              <input id="password" type="password" onChange={(e) => RegistrationForm(e)} value={data.Password} placeholder="Password"
                     data-required/>
              {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
              <span>{formErrors['password']}</span>
          </div>

        <div className="form-item box-item">
          <input id="repeat_password" type="password"  placeholder="Repeat Password" onChange={(e) => RegistrationForm(e)} value={data.RepeatPassword} data-required/>
          {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
            <span>{formErrors['repeat_password']}</span>
        </div>


        <div className="form-item box-item">
          <input id="phone_number" type="number" placeholder="Phone Number" onChange={(e) => RegistrationForm(e)} value={data.PhoneNumber} data-required/>
          {/*<small className="errorReq"><i className="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
            <span>{formErrors['phone_number']}</span>
        </div>

          <div className="form-item box-item">
              <label>Choose Your Avatar</label><br></br><br></br>
              <input id="avatar" type="file" placeholder="Avatar" onChange={(e) => RegistrationForm(e)} value={data.Avatar} data-required data-number data-count="10"/>
              <span>{formErrors['avatar']}</span>
              {/*<small className="errorReq"><i class="fa fa-asterisk" aria-hidden="true"></i> required field</small>*/}
              {/*<small className="errorNum"><i class="fa fa-asterisk" aria-hidden="true"></i> must be a number</small>*/}
              {/*<small className="errorChar"><i class="fa fa-asterisk" aria-hidden="true"></i> must be 10 digits</small>*/}
          </div>
        <div className="form-item">
          <button className='submit'>Submit</button>
        </div>
      </form>
    </main>
    <footer>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </footer>
    <i class="wave"></i>
  </section>
</div>
    </div>
    )
}


export default EditProfile;