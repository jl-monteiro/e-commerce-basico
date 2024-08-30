import React, { useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const Alerta = ({ msg, msgShow, setMsgShow }) => {

    return (
        <Snackbar open={msgShow} autoHideDuration={3000} onClose={() => setMsgShow(false)}>
            <Alert onClose={() => setMsgShow(false)} severity="success">{msg}</Alert>
        </Snackbar>
    )
}

export default Alerta