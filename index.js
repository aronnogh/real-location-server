// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');
const driverRoutes = require('./routes/driverRoutes');

// integrating map start----------------------------------------------------------------------
const path=require('path')
const app = express();
const http=require('http')
const socketio=require('socket.io')
const server=http.createServer(app)
const io =socketio(server)

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));


io.on("connection",(socket)=>{
  socket.on('send-position',(data)=>{
      io.emit('recieve-position',{id:socket.id,...data})
  })
  console.log('connected')
})

app.get("/map", (req, res) => { // has to change the location after building the driver frontend
  res.render("index");
  console.log('Connected to map server');
});
// integrating map end----------------------------------------------------------------------


// port number
const port = 5000;

app.use(cors());
app.use(express.json());

// Use the correct carRoutes
app.use('/api/cars/', carRoutes); // For car routes
app.use('/api/drivers/', driverRoutes); // For driver routes



const mongoURI = 'mongodb+srv://aronacosta173:QK8yqNDyQlCdVJ2k@cluster0.rgn5c.mongodb.net/cardataforFinal?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
})
.catch((err) => {
  console.log('MongoDB connection error:', err);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
