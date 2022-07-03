getMostRecentMessages()
  .then(results => {
    socket.emit("mostRecentMessages", results.reverse());
  })
  .catch(error => {
    socket.emit("mostRecentMessages", []);
  });