import classes from "./InputButton.module.scss";

interface InputButtonProps{
    setOpenAdd: (value: boolean) => void,
}

const InputButton = ({setOpenAdd}:InputButtonProps) => {
    return(
        <div className={classes.InputButton}>
            <img className={classes.PlusSign} src="https://static.vecteezy.com/system/resources/previews/009/266/327/original/plus-sign-icon-free-png.png" alt="plus sign img" onClick={()=>setOpenAdd(true)}/>
        </div>
    )
}

export default InputButton;