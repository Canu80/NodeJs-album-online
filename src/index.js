import app from "./server.js";

const server = app.listen(app.get("port"), ()=>{
    console.log('Servicio funcionando en el puerto: ' + app.get("port"));
})

const {connectDB} = await import("./config/connectDB.js");
connectDB();