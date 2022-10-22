import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import socketIOClient from "socket.io-client";
import classnames from "classnames";
import commonUtilites from "../Utilities/common";
import { useGetPostMessages } from "../Services/chatService";
import { authenticationService } from "../Services/authenticationService";
import { Formik, Form, useField } from 'formik';
import * as yup from "yup";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  headerRow: {
    maxHeight: 60,
    zIndex: 5,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.palette.primary.dark,
  },
  messageContainer: {
    height: "100%",
    display: "flex",
    alignContent: "flex-end",
  },
  messagesRow: {
    maxHeight: "calc(100vh - 184px)",
    overflowY: "auto",
  },
  newMessageRow: {
    width: "100%",
    padding: theme.spacing(0, 2, 1),
  },
  messageBubble: {
    padding: 10,
    border: "1px solid white",
    backgroundColor: "white",
    borderRadius: "0 10px 10px 10px",
    boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
    marginTop: 8,
    maxWidth: "40em",
  },
  messageBubbleRight: {
    borderRadius: "10px 0 10px 10px",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  form: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
  },
  listItem: {
    display: "flex",
    width: "100%",
  },
  listItemRight: {
    flexDirection: "row-reverse",
  },
}));

const ChatBox = ({ scope, conversationId, user }) => {
  const [currentUserId] = useState(authenticationService.currentUserValue.userId);
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const { getGlobalMessages, sendGlobalMessage, getConversationMessages, sendConversationMessage } = useGetPostMessages();
  let chatBottom = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    reloadMessages();
    scrollToBottom();
  }, [lastMessage, scope, conversationId]);

  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("messages", (data) => setLastMessage(data));
  }, []);

  const reloadMessages = () => {
    if (scope === "Global Chat") {
      getGlobalMessages()
        .then((res) => {
          console.log(res)
          setMessages(res.data);
        });
    } else if (scope !== null && conversationId !== null) {
      getConversationMessages(user._id).then((res) => setMessages(res.data));
    } else {
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (values, { resetForm }) => {
    if (scope === "Global Chat") {
      sendGlobalMessage(values.message).then(() => {
        resetForm();
      });
    } else {
      sendConversationMessage(user._id, values.message).then((res) => {
        resetForm();
      });
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.headerRow}>
        <Paper className={classes.paper} square elevation={2}>
          <Typography color="inherit" variant="h6">
            {scope}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.messageContainer}>
          <Grid item xs={12} className={classes.messagesRow}>
            {console.log(messages)}
            {messages && (
              <List>
                {messages.map((m) => (
                  <ListItem
                    key={m._id}
                    className={classnames(classes.listItem, {
                      [`${classes.listItemRight}`]:
                        m.fromObj[0]._id === currentUserId,
                    })}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar className={classes.avatar}>
                      <Avatar>
                        {commonUtilites.getInitialsFromName(m.fromObj[0].name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      classes={{
                        root: classnames(classes.messageBubble, {
                          [`${classes.messageBubbleRight}`]:
                            m.fromObj[0]._id === currentUserId,
                        }),
                      }}
                      primary={m.fromObj[0] && m.fromObj[0].name}
                      secondary={<React.Fragment>{m.body}</React.Fragment>}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <div ref={chatBottom} />
          </Grid>
          <Grid item xs={12} className={classes.inputRow}>
            <Formik
              initialValues={{ message: "" }}
              validationSchema={yup.object().shape({
                message: yup.string().required("Message is required"),
              })}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                handleSubmit(values, { resetForm });
                setSubmitting(false);
              }}
            >{({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Grid
                  container
                  className={classes.newMessageRow}
                  alignItems="flex-end"
                >
                  <Grid item xs={11}>
                    <MyTextField
                      id="message"
                      label="Message"
                      name="message"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton type="submit">
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </form>
            )
              }
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;

export const MyTextField = ({ placeholder, label, onChange, value, type, autoFillOff, required, multiple, rows, onBlur, disabled = false, inputProps = { min: 0, step: ".0001" }, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <div className="form-group">
      <TextField
        size="small"
        fullWidth
        multiline={multiple || false}
        minRows={rows || 0}
        variant="outlined"
        type={type}
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        autoComplete={autoFillOff && "new-password"}
        required={required}
        helperText={errorText}
        error={!!errorText}
        inputProps={inputProps}
        {...field}
        onBlur={onBlur}
        onKeyUp={onChange}
      />
    </div>
  );
}