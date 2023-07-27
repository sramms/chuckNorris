import { useState } from "react";
import classes from "./InputModal.module.scss";
import api from "../../api/api";
import AddUser from "../../images/AddUser.png";

interface InputModalProps{
    setOpenAdd: (value: boolean) => void,
    setEmails: (value:string[]) => void,
}

const InputModal = ({setOpenAdd, setEmails}:InputModalProps) => {
    const [email, setEmail] = useState("");
    const [valid, setValid] = useState(false);
    const [showWarning, setShowWarning] = useState(false)

    const saveEmail = async (email:string) => {
        const body = {email};

        try {
            const response = await api.post("/emails", body);
            setEmails(response.data);
        } catch (error) {
            console.log(error);
        }

    }
 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        //Check if input is a valid email address (X@Y.Z)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.length!==0 && emailRegex.test(event.target.value)){
            setShowWarning(false);
        }else{
            setShowWarning(true);
        }
        setValid(emailRegex.test(event.target.value));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveEmail(email);
 
        setOpenAdd(false);
    }

    return(
    <div className={classes.Overlay}>
        <div className={classes.Modal}>
            <div className={classes.X} onClick={()=>setOpenAdd(false)}>X</div>
            <img src={AddUser} alt="Add user icon" className={classes.UserIcon}/>
            <p>Add a new email address</p>
            <form onSubmit={handleSubmit} className={classes.Form}>
                <input type="text" value={email} onChange={handleChange} className={classes.Input}/>
                {showWarning ? <span className={classes.Warning}>Uh-oh, looks like this isn't a valid email address!</span> : <></>}
                <button type="submit"  disabled={!valid} className={classes.Button}>Add</button>
            </form>
        </div>
    </div>)
}

export default InputModal;