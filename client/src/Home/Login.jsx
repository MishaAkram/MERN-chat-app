import React from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import { Grid, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import history from '../Utilities/history';
import { useLogin } from '../Services/authenticationService';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(10),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = props => {
    const login = useLogin();
    const classes = useStyles();
    const paperStyle = {
        maxWidth: "330px", margin: "0 auto", marginTop: "30px", padding: "20px", flexDirection: "column", alignItems: "center",
        justifyContent: "center", display: "flex", background: "white", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
    };
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    return (
        <div style={paperStyle}>
            <Grid align='center'>
                <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                <h2>Sign In</h2>
            </Grid>
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                        .required('Username is required')
                        .max(40, 'Username is too long'),
                    password: Yup.string()
                        .required('Password is required')
                        .max(100, 'Password is too long')
                        .min(6, 'Password too short'),
                })}
                onSubmit={(
                    { username, password },
                    { setStatus, setSubmitting }
                ) => {
                    setStatus();
                    login(username, password).then(
                        () => {
                            const { from } = history.location.state || {
                                from: { pathname: '/chat' },
                            };
                            history.push(from);
                        },
                        error => {
                            setSubmitting(false);
                            setStatus(error);
                        }
                    );
                }}
            >
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    touched,
                    errors,
                }) => (
                    <form
                        onSubmit={handleSubmit}
                        className={classes.form}
                    >
                        <TextField
                            id="username"
                            className={classes.textField}
                            name="username"
                            label="Username"
                            fullWidth={true}
                            variant="outlined"
                            margin="normal"
                            required={true}
                            size="small"
                            helperText={
                                touched.username ? errors.username : ''
                            }
                            error={
                                touched.username &&
                                Boolean(errors.username)
                            }
                            value={values.username}
                            onChange={handleChange}
                        />
                        <TextField
                            id="password"
                            className={classes.textField}
                            name="password"
                            label="Password"
                            fullWidth={true}
                            variant="outlined"
                            margin="normal"
                            required={true}
                            size="small"
                            helperText={
                                touched.password ? errors.password : ''
                            }
                            error={
                                touched.password &&
                                Boolean(errors.password)
                            }
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth={true}
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Login
                        </Button>
                    </form>
                )}
            </Formik>
            <Grid item xs={9}>
                <Typography>
                    <Link
                        onClick={() => props.handleClick('register')}
                        href="#"
                    >
                        Don't have an account?
                    </Link>
                </Typography>
            </Grid>
        </div>
    );
};

export default Login;