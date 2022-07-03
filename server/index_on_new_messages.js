socket.on("newChatMessage",(data) => {
    //send event to every single connected socket
    try{
      const message = new Message(
        {
          user_name: data.user_name,
          user_avatar: data.user_avatar,
          message_text: data.message,
        }
      )
      message.save().then(()=>{
        io.emit("newChatMessage",{user_name: data.user_name, user_avatar: data.user_avatar, message_text: data.message});
      }).catch(error => console.log("error: "+error))
    }catch (e) {
      console.log("error: "+e);
    }
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });