import classes from "./SendMailModal.module.scss";
import api from "../../api/api";
import Mail from "../../images/Mail.png";

interface SendMailModalProps{
    setOpenMailModal: (value: boolean) => void,
    setNotification: (value: boolean) => void,
    selectedMail: string,
}

const SendMailModal = ({setOpenMailModal, selectedMail, setNotification}:SendMailModalProps) => {

    const sendEmail = async (email:string) => {
        const body = {email:email};

        try {
            const response = await api.post("/sendEmail", body);
            setOpenMailModal(false);
            setNotification(true);
        } catch (error) {
            console.log(error);
        }

    }

    const handleSend = () => {
        sendEmail(selectedMail);
    }

    return(
        <div className={classes.Overlay}>
            <div className={classes.Modal}>
                <div className={classes.X} onClick={()=>setOpenMailModal(false)}>X</div>
                <img className={classes.MailIcon} src={Mail} alt="Email icon"/>
                <p>{selectedMail}</p>
                <button onClick={handleSend} className={classes.Button}>Send a Chuck Norris joke!</button>
            </div>
        </div>
    )
}

export default SendMailModal;