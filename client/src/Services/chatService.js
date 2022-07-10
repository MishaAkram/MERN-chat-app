import useHandleResponse from '../Utilities/handle-response';
import authHeader from '../Utilities/auth-header';
import { useSnackbar } from 'notistack';
import axios from 'axios';

// Receive global messages
export function useGetGlobalMessages() {
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
    return getGlobalMessages;
}
// Send a global message
export function useSendGlobalMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
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
    return sendGlobalMessage;
}

// Get list of users conversations
export function useGetConversations() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
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

    return getConversations;
}

// get conversation messages based on
// to and from id's
export function useGetConversationMessages() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
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
    return getConversationMessages;
}

export function useSendConversationMessage() {
    const { enqueueSnackbar } = useSnackbar();
    const handleResponse = useHandleResponse();
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

    return sendConversationMessage;
}
