import React, { useState } from 'react';
const axios = require('axios');
import ReactOnRails from "react-on-rails";


const UserEditForm = props => {

  const [name, setName] = useState(props.name);
  const [login, setLogin] = useState(props.login);
  const [email, setEmail] = useState(props.email);
  const [web_page, setWebPage] = useState(props.web_page);
  const [phone, setPhone] = useState(props.phone);
  const [gender, setGender] = useState(props.gender);
  const [about_me, setAboutMe] = useState(props.about_me);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/users/${props.user_id}`, 
     {authenticity_token: ReactOnRails.authenticityToken(),
      user:{
        name: name,
        login: login,
        email: email,
        web_page: web_page,
        phone: phone,
        gender: gender,
        about_me: about_me
        }
      }
    ).then(response=>{
      if (response.status == 200)
        window.location.replace(`/users/${props.user_id}`)
    });
  }

  const genderChange = event => {
    setGender(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-1">
        <label htmlFor="login" className="edit-label">Login</label>
        <input id="login" 
               type="text" 
               name="login" 
               className="edit-input" 
               value={login} 
               onChange={e=>{setLogin(e.target.value)}}/>
        <p className="edit-input-description">
          To make it easier for people to find your account, 
          use the name by which they know you: your first and last name, 
          ickname or company name
        </p>
      </div>
      <div className="row mb-4">
        <label htmlFor="name" className="edit-label">Name</label>
        <input id="name" 
               type="text" 
               name="name" 
               className="edit-input" 
               value={name} 
               onChange={e=>{setName(e.target.value)}}/>
      </div>
      <div className="row mb-4">
        <label htmlFor="web_page" className="edit-label">Web page</label>
        <input id="web_page" 
               type="text" 
               name="web_page" 
               className="edit-input" 
               value={web_page} 
               onChange={e=>{setWebPage(e.target.value)}}/>
      </div>
      <div className="row mb-1">
        <label htmlFor="about_me" className="edit-label">About me</label>
        <textarea id="about_me" 
                  type="text" 
                  name="about_me" 
                  className="edit-input" 
                  style={{resize: 'vertical'}} 
                  value={about_me} 
                  onChange={e=>{setAboutMe(e.target.value)}}/>
        <p className="edit-input-description">
          Personal information Provide personal information even 
          if the account will be used for a company, pet or other purpose.
          This information will not appear on your public profile.
        </p>
      </div>
      <div className="row mb-4">
        <label htmlFor="email" className="edit-label">Email</label>
        <input id="email" 
               type="email" 
               name="email" 
               className="edit-input" 
               value={email} 
               onChange={e=>{setEmail(e.target.value)}}/>
      </div>
      <div className="row mb-4">
        <label htmlFor="phone" className="edit-label">Phone number</label>
        <input id="phone" 
               type="tel" 
               name="phone" 
               className="edit-input" 
               value={phone} 
               onChange={e=>{setPhone(e.target.value)}}/>
      </div>
      <div className="edit-gender-row">
        <label htmlFor="gender_male" className="me-2">Male</label>
        <input id="gender_male" 
               type="radio" 
               name="gender" 
               value='male' 
               className="me-5" 
               checked={gender=='male'} 
               onChange={genderChange}/>
        <label htmlFor="gender_female" className="me-2">Female</label>
        <input id="gender_female" 
               type="radio" 
               name="gender" 
               value='female' 
               className="me-2" 
               checked={gender=='female'} 
               onChange={genderChange}/>
      </div>
      <div className="row">
        <input type="submit" className="edit-submit-button" value="Send" />
      </div>
    </form>
  )
}

export default UserEditForm;
