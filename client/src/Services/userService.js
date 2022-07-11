import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
import { useSnackbar } from 'notistack';
import axios from 'axios'
export function useGetUsers() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const getUsers = () => {
        try {
            return axios.get(`${process.env.REACT_APP_API_URL}/api/users`, { headers: authHeader() })
                .then(handleResponse)
        } catch (err) {
            enqueueSnackbar('Could not load Global Chat', {
                variant: 'error',
            });
        }
    };
    return getUsers;
}
