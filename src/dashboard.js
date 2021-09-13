import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    DialogTitle,
    DialogContentText,
    TextField
  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { green, red, grey } from '@material-ui/core/colors';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  cellStyle: {
    position: 'sticky',
    paddingLeft: 20,
    top: 0
  },
  buttonStyle: {
    textTransform: 'none',
    marginLeft: 20,
    backgroundColor: '#219e91',
    width: 300,
    color: '#FFF',
    '&:hover': {
        backgroundColor: '#0c8e80'
    }
    },
  buttonGridStyle: {
    paddingBottom: 15,
    paddingTop: 10
    },  
  textField: {
    height: 38,
    marginLeft: 10,
    marginRight: 10,
    width: 300,
    color: grey[100],
    background: '#8a92a0',
    notchedOutline: 'false',
    textAlign: 'center',
    borderRadius: '4.5px'
    }
});

const WEBSERVICE_URL = 'http://localhost:8082/';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function Dashboard() {
  const classes = useStyles();
  const [employeeList, setEmployees] = useState([])
  const [open, isOpen] = useState(false)
  const [inputs, setInputs] = useState({
    name: '',
    age: '',
    address: '',
    emailId:'',
    mobileNum: ''
    });
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState('')
  const { name, age, address, emailId, mobileNum} = inputs;
  function handleChange(e) {
    const { name, value } = e.target;
    setError('')
    setInputs(inputs => ({ ...inputs, [name]: value }));
  }

 function getEmployeeist(){
    fetch(`${WEBSERVICE_URL}employee/`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('loginToken')
        }
    })
  .then(response => response.json())
  .then(data =>
     {
         if(data.success){
             setEmployees(data.data)
         } else {
             setEmployees([])
         }
     });
  }

useEffect(() => {
   getEmployeeist();
}, [])

function handleEditClicked(empId){
    const inputs = employeeList.find(e => e.empId === empId)
    setInputs(inputs);
    isOpen(true)
    setEditMode(empId)
}

function handleDeleteClick(empId){
    fetch(`${WEBSERVICE_URL}employee/${empId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('loginToken'),
            'Content-Type': 'application/json'
        }
    })
  .then(response => response.json())
  .then(data =>
     {
         if(data.success){
             setEmployees(data.data)
         } else {
             setEmployees([])
         }
     });
}

function handleAdd(empId){
    isOpen(true);
    setEditMode('')
    setInputs({
        name: '',
        age: '',
        address: '',
        emailId:'',
        mobileNum: ''
    })
}

function handleSave(){
    let method;
    let url;

    if(name === '' || emailId === '' || mobileNum === ''){
        setError("Please add mandatory fields");
        return;
    }

    if(editMode !== ''){
         method = 'PATCH'
         url = `${WEBSERVICE_URL}employee/${editMode}`
    } else
    {
        method = 'POST'
        url = `${WEBSERVICE_URL}employee/`
    }
    fetch(`${url}`, {
        method,
        headers: {
            'Authorization': localStorage.getItem('loginToken'),
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(inputs)
    })
  .then(response => response.json())
  .then(data =>
     {
         if(data.success){
             setEmployees(data.data)
         } else {
             setEmployees([])
         }
         isOpen(false)
     });
}

  return (
      <>
       <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => isOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Add Employee"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <Grid item xs={12} sm={12}>
                  <TextField
                    value={name}
                    onChange={handleChange}
                    placeholder="Name"
                    type="name"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    InputProps={{
                      classes: {
                        root: classes.textField
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={age}
                    onChange={handleChange}
                    placeholder="Age"
                    type="age"
                    name="age"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    InputProps={{
                      classes: {
                        root: classes.textField
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={address}
                    onChange={handleChange}
                    placeholder="Address"
                    type="address"
                    name="address"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    InputProps={{
                      classes: {
                        root: classes.textField
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={emailId}
                    onChange={handleChange}
                    placeholder="EmailId"
                    type="emailId"
                    name="emailId"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    InputProps={{
                      classes: {
                        root: classes.textField
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={mobileNum}
                    onChange={handleChange}
                    placeholder="Mobile"
                    name="mobileNum"
                    type="mobileNum"
                    margin="normal"
                    variant="outlined"
                    autoComplete="off"
                    InputProps={{
                      classes: {
                        root: classes.textField
                      }
                    }}
                  />
                </Grid>
                {error !== '' ? (
                  <Grid>
                    <p className={classes.errorMessageColor}>
                      {error}
                    </p>
                  </Grid>
                ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={() => isOpen(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    <TableContainer component={Paper}>
        <Grid item xs={12} sm={12}>
            <h3>Employee List</h3>
        </Grid>
        <Grid item xs={1} className={classes.buttonGridStyle}>
            <Button
            onClick={handleAdd}
            className={classes.buttonStyle}
            name="btn"
            variant="contained"
            >
                Add
        </Button>
    </Grid>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className= {classes.cellStyle}><b>Name</b></TableCell>
            <TableCell className= {classes.cellStyle} align="right"><b>Age</b></TableCell>
            <TableCell className= {classes.cellStyle} align="right"><b>Address</b></TableCell>
            <TableCell className= {classes.cellStyle} align="right"><b>EmailId</b></TableCell>
            <TableCell className= {classes.cellStyle} align="right"><b>MobileNum</b></TableCell>
            <TableCell className= {classes.cellStyle} align="right"><b>Edit</b></TableCell>
            <TableCell className= {classes.cellStyle} align="right"><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeList.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.emailId}</TableCell>
              <TableCell align="right">{row.mobileNum}</TableCell>
              <TableCell align="right">
              <IconButton
                aria-label="Edit"
                onClick={() => handleEditClicked(row.empId)}
                >
                {<EditIcon />}
                </IconButton>
              </TableCell>
              <TableCell align="right">
              <IconButton
                aria-label="Edit"
                onClick={() => handleDeleteClick(row.empId)}
            >
                {<DeleteIcon />}
            </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}
