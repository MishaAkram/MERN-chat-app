import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { purple } from '@material-ui/core/colors';
import history from './Utilities/history';
import PrivateRoute from './Utilities/private-route';
import Home from './Home/Home';
import Chat from './Chat/Chat';
const theme = createTheme({
    palette: {
        primary: {
            main: purple[600],
        },
        secondary: {
            main: purple[600],
        },
        background: {
            default: '#f0f0f0',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
                <Router history={history}>
                    <Route path="/" exact component={Home} />
                    <PrivateRoute path="/chat" component={Chat} />
                </Router>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
