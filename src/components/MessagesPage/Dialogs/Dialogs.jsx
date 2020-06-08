import React from "react";
import Dialog from "./Dialog";

const Dialogs = props => {
  return props.dialogsData.map( dialog => <Dialog id={dialog.id} key={dialog.id} name={dialog.name} /> )
};

export default Dialogs;