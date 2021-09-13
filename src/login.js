import React, { useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { green, red, grey } from '@material-ui/core/colors';
//import { useDispatch, useSelector } from 'react-redux';
import {
    withStyles,
    Card,
    CardContent,
    TextField,
    Grid,
    Button
  } from '@material-ui/core';
// import { userActions } from '../_actions';
const WEBSERVICE_URL = 'http://localhost:8082/';

const withCustomStyle = withStyles(() => ({
    cardStyle: {
        backgroundColor: 'rgb(28,43,54,0.5 )',
        textAlign: 'center',
        width: 368,
        height: 369.52,
        borderRadius: '10.5px'
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
      },
    
      container: {
        display: 'flex',
        flexWrap: 'wrap'
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
      title: {
        fontSize: 55,
        color: grey[100]
      },
    
      textColorRed: {
        color: red[600],
        fontSize: 14,
        marginLeft: 130,
        marginRight: 50
      },
    
      textColorGreen: {
        color: green[600],
        fontSize: 14,
        marginLeft: 130,
        marginRight: 50
      },
      forgotPasswordGridStyle: {
        paddingTop: 10,
        paddingBottom: 10
      },
      forgotPasswordLinkStyle: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: 13,
        marginRight: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'right',
        alignItems: 'right'
      },
      errorMessageColor: {
        color: 'red'
      },
      cardBackgroundReset: {
        backgroundColor: 'rgb(28,43,54,0.5 )',
        width: 368,
        height: 347
      },
      appHeader: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
      }
  }));

function LoginPage({classes, history}) {
    const [inputs, setInputs] = useState({
        userName: '',
        password: ''
    });

    const { userName, password } = inputs;
    const [error, setError] = useState('')
  
    function handleChange(e) {
        const { name, value } = e.target;
        setError('')
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(userName === '' || password === ''){
            setError('Please fill mandatory field')
        }

        if (userName && password && error === '') {
           fetch(`${WEBSERVICE_URL}users/login?userName=${userName}&password=${password}`, {
               method: 'GET'
           })
         .then(response => response.json())
         .then(data =>
            {
                if(data.success){
                    setError('')
                    const {emailId, firstName,lastName,token,userId,userName} = data.info;
                    localStorage.setItem('emailId', emailId)
                    localStorage.setItem('firstName', firstName)
                    localStorage.setItem('lastName', lastName)
                    localStorage.setItem('loginToken', token)
                    localStorage.setItem('userId', userId)
                    localStorage.setItem('userName', userName)
                    history.push('/dashboard')
                } else {
                    setError(data.message)
                }
            });
        }
    }

    return (
        <div>
        <header className={classes.appHeader}>
          <Card className={classes.cardStyle}>
            <CardContent>
              <div>
                <Grid item xs={12} sm={12}>
                  <h3>Login</h3>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    value={userName}
                    onChange={handleChange}
                    id="KE_Login_userName-input"
                    placeholder="Login name"
                    type="userName"
                    name="userName"
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
                    value={password}
                    onChange={handleChange}
                    id="KE_Login_password-input"
                    placeholder="Password"
                    name="password"
                    type="password"
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
                <Grid className={classes.forgotPasswordGridStyle}>
                 
                  <NavLink
                    className={classes.forgotPasswordLinkStyle}
                    align="right"
                    to="/signup"
                    id="KE_Login_ForgotPassword"
                  >
                    Create as New User?
                  </NavLink>
                </Grid>
                <Grid item xs={1} className={classes.buttonGridStyle}>
                  <Button
                    onClick={handleSubmit}
                    className={classes.buttonStyle}
                    name="btn"
                    variant="contained"
                    id="KE_Login_Button"
                  >
                    Login
                  </Button>
                </Grid>
                {error !== '' ? (
                  <Grid>
                    <p className={classes.errorMessageColor}>
                      {error}
                    </p>
                  </Grid>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </header>
      </div>
    );
}

export default (withCustomStyle)(LoginPage);