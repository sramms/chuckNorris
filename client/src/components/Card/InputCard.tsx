import classes from "./InputCard.module.scss";

interface InputCardProps{
    email: string
}

const InputCard = ({email}:InputCardProps) => {
    const emailLimit = email.length > 30 ? email.substring(0, 30) + '...' : email;
    return(
        <div className={classes.CardWrapper}>
            <div className={classes.Card}>
                <p>{emailLimit}</p>
            </div>
    </div>
    )
}

export default InputCard;