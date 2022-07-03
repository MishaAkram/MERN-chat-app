const initApp = async () =>{
    try{
      await mongoConnect();
      console.log("DB connection established");
      app.listen(process.env.HTTP_PORT,()=>{
        console.log(`HTTP Server listening on ${process.env.HTTP_PORT}`)});
    }catch (e) {
      throw e;
    }
  }
  
  initApp().catch(err => console.log(`Error on startup! ${err}`));