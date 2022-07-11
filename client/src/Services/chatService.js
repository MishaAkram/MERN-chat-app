import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
import { useSnackbar } from 'notistack';
import axios from 'axios';
export function useGetPostMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
    const getGlobalMessages = () => {
        try {
            return axios.get(`${process.env.REACT_APP_API_URL}/api/messages/global`, { headers: authHeader() })
                .then(handleResponse)
        } catch (error) {
            enqueueSnackbar('Could not load Global Chat', {
                variant: 'error',
            });
        }
    }
    const sendGlobalMessage = body => {
        try {
            return axios.post(
                `${process.env.REACT_APP_API_URL}/api/messages/global`, body,
                { headers: authHeader() }
            )
                .then(handleResponse)
        } catch (error) {
            enqueueSnackbar('Could send message', {
                variant: 'error',
            });
        }
    };
    const getConversations = () => {
        try {
            return axios.get(
                `${process.env.REACT_APP_API_URL}/api/messages/conversations`,
                { headers: authHeader() }
            )
                .then(handleResponse)
        } catch (error) {
            enqueueSnackbar('Could not load chats', {
                variant: 'error',
            });
        }
    };
    const getConversationMessages = id => {
        try {
            return axios.get(`${process.env.REACT_APP_API_URL}/api/messages/conversations/query?userId=${id}`,
                { headers: authHeader() })
                .then(handleResponse)
        }
        catch (error) {
            enqueueSnackbar('Could not load chats', {
                variant: 'error',
            });
        };
    }
    const sendConversationMessage = (id, body) => {
        try {
            return axios.post(`${process.env.REACT_APP_API_URL}/api/messages/`, { to: id, body: body },
                { headers: authHeader() })
                .then(handleResponse)
        } catch (error) {
            enqueueSnackbar('Could not send message', {
                variant: 'error',
            });
        }
    };
    return { getGlobalMessages, sendConversationMessage, getConversationMessages, getConversations, sendGlobalMessage };
}