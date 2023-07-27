import classes from "./NotificationModal.module.scss";
import EmailSent from "../../images/EmailSent.png"

interface NotificationModalProps{
    setNotification: (value: boolean) => void,
}

const NotificationModal = ({setNotification}:NotificationModalProps) => {
    return(
        <div className={classes.Overlay}>
        <div className={classes.Modal}>
            <div className={classes.X} onClick={()=>setNotification(false)}>X</div>
            <img className={classes.MailIcon} src={EmailSent} alt="Email icon"/>
            <p className={classes.NotificationText}>Joke sent!</p>
        </div>
    </div>
    )
}

export default NotificationModal;