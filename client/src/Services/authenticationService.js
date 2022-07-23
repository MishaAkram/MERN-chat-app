import { BehaviorSubject } from 'rxjs';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import useHandleResponse from '../Utilities/handle-response';

const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value;
    },
};

export function useLogin() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const login = (username, password) => {
        return axios.post(`${process.env.REACT_APP_API_URL}/api/users/login`,
            { username, password }, { headers: { 'Content-Type': 'application/json' } })
            .then(handleResponse)
            .then(user => {
                console.log(user)
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                currentUserSubject.next(user.data);
                return user;
            })
            .catch(function () {
                enqueueSnackbar('Failed to Login', {
                    variant: 'error',
                });
            });
    };
    return login;
}

export function useRegister() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();

    const register = (name, username, password, password2) => {
        return axios.post(`${process.env.REACT_APP_API_URL}/api/users/register`,
            { name, username, password, password2 }, { headers: { 'Content-Type': 'application/json' } })
            .then(handleResponse)
            .then(user => {
                console.log(user)
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                currentUserSubject.next(user.data);

                return user;
            })
            .catch(function (response) {
                if (response) {
                    enqueueSnackbar(response, {
                        variant: 'error',
                    });
                } else {
                    enqueueSnackbar('Failed to Register', {
                        variant: 'error',
                    });
                }
            });
    };

    return register;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}