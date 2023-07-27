import classes from "./App.module.scss";
import React, { useEffect, useState } from 'react';
import api from './api/api';
import InputButton from './components/InputButton/InputButton';
import InputModal from './components/InputModal/InputModal';
import { response } from 'express';
import InputCard from './components/Card/InputCard';
import Chuck from "./images/Chuck.png";
import SendMailModal from "./components/SendMailModal/SendMailModal";
import NotificationModal from "./components/NotificationModal/NotificationModal";

type Email = string;

function App() {
  const [emails, setEmails] = useState<Email[]>([])
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openMailModal, setOpenMailModal] = useState<boolean>(false);
  const [selectedMail, setSelectedMail] = useState<string>("");
  const [notification, setNotification] = useState<boolean>(false);

  useEffect(()=>{
    const fetchEmails = async () => {
      try {
        await api.get("/emails").then((response)=>{
          setEmails(response.data)
        })
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchEmails();
  },[])

  const handleClick = (email:Email) => {
    setSelectedMail(email);
    setOpenMailModal(true);
  }

  return (
    <div className={classes.App}>
      <img className={classes.Logo} src={Chuck} alt="Chuck Norris img"/>
      {emails.map((email, index) =>{
        return(
          <div onClick={()=>handleClick(email)} key={index}>
            <InputCard email={email}/>
          </div>
        )
      })}
      <InputButton setOpenAdd={setOpenAdd}/>
      {openAdd ? <InputModal setEmails={setEmails} setOpenAdd={setOpenAdd}/> : <></>}
      {openMailModal ? <SendMailModal selectedMail={selectedMail} setOpenMailModal={setOpenMailModal} setNotification={setNotification}/> : <></>}
      {notification ? <NotificationModal setNotification={setNotification}/> : <></>}
    </div>
  );
}

export default App;
