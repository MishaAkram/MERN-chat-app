import { authenticationService } from '../Services/authenticationService';
import { useSnackbar } from 'notistack';

const useHandleResponse = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = response => {
        if (response.statusText != "OK") {
            if ([401, 403].indexOf(response.status) !== -1) {
                authenticationService.logout();
                enqueueSnackbar('User Unauthorized', {
                    variant: 'error',
                });
            }
            const error = (response?.data && response?.data.message) || response.statusText;
            return Promise.reject(error);
        }
        return response
    }
    }
