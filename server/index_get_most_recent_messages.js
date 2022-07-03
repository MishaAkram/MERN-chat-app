async function getMostRecentMessages (){
    return await Message
      .find()
      .sort({_id:-1})
      .limit(10);
  }