import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material"
import { Fragment } from "react"

export default function TodoDetails(props){
    const {dialog,todoDetails,setDialog,setTodoDetails} = props

    return <Fragment>
        <Dialog open={dialog} onClose={()=>setDialog(false)}>
            <DialogTitle>
                {todoDetails?.todo}
            </DialogTitle>
            <DialogActions>
                <Button onClick={()=>{
                    setTodoDetails(null),
                    setDialog(false)
                }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </Fragment>
}

