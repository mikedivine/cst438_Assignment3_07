import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// complete the code.  
// instructor adds an assignment to a section
// use mui Dialog with assignment fields Title and DueDate
// issue a POST using URL /assignments to add the assignment

const AssignmentAdd = (props)  => {

    const [open, setOpen] = useState(false);
    const [editMessage, setEditMessage] = useState('');
    const [assignment, setAssignment] = useState({id:'', title:'', dueDate:'', courseId:'', secId:'', secNo:''});

    /*
     *  dialog for add assignment
     */
    const editOpen = () => {
        setOpen(true);
        setEditMessage('');
        setAssignment(props.assignment);
    };

    const editClose = () => {
        setOpen(false);
        setAssignment({id:'',title:'', dueDate:'', courseId:'', secId:'', secNo:''});
        setEditMessage('');
    };

    const editChange = (event) => {
        setAssignment({...assignment,  [event.target.name]:event.target.value})
    }

    const onSave = () => {
        if (assignment.title==='') {
            setEditMessage("Title can not be blank");
        } else if (assignment.dueDate==='') {
            setEditMessage("Due Date must not be blank");
        } else {
            props.save(assignment);
            editClose();
        }
    }

    return (
        <>
            <Button onClick={editOpen}>Add Assignment</Button>
            <Dialog open={open} >
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogContent style={{paddingTop: 20}} >
                    <h4>{editMessage}</h4>
                    <TextField style={{padding:10}} fullWidth label="title" name="title"
                        value={assignment.title} onChange={editChange} /> 
                    <input type="date" style={{padding:10}} fullWidth label="dueDate" name="dueDate"
                        value={assignment.dueDate} onChange={editChange} />
                    <input type="hidden" name="courseId" value={assignment.courseId} />
                    <input type="hidden" name="secId" value={assignment.secId} />
                    <input type="hidden" name="secNo" value={assignment.secNo} />
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={editClose}>Close</Button>
                    <Button color="primary" onClick={onSave}>Save</Button>
                </DialogActions>
            </Dialog> 
        </>                       
    )
}

export default AssignmentAdd;
