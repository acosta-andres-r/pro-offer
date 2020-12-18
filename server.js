const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const uuid = require("uuid/v4");
const PORT = process.env.PORT || 3001;
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors")

const routes = require("./routes");
const formatMessage = require("./utils/messages")
const { userJoin, getCurrentUser, userLeave, getRoomUsers, getRoomNames } = require("./utils/users")


const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "client/public/img/uploads"),
  filename: (req, file, cb, filename) => {
    console.log("in multer");
    console.log(file);
    cb(null, uuid() + path.extname(file.originalname));
  }
})

app.use(multer({ storage }).single("image"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

app.use(cors)

const botName = "ChatCord Bot"; // Server name
// SOCKET.IO - Run when client connects
io.on("connection", (socket) => {

  // Create user and room for chat
  io.emit('creation', {
    user: socket.id + '-USER',
    room: Array.from(socket.rooms)[0]
  })

  // Join Room
  socket.on("joinRoom", ({ user, room }) => {

    const userJoined = userJoin(socket.id, user, room);
    console.log('user id', socket.id);
    console.log('rooms', socket.rooms);
    socket.join(userJoined.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // Bradcast when a user connects
    socket.broadcast
      .to(userJoined.room)
      .emit("message", formatMessage(botName, `${userJoined.username} has joined the chat`)); // except client connected

    // Send users and room info
    io.to(userJoined.room).emit("roomUsers", {
      room: userJoined.room,
      users: getRoomUsers(userJoined.room)
    });
    
    // Send rooms info
    io.to(userJoined.room).emit("roomsInfo", {
      rooms: getRoomNames()
    });

  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg, callback) => {
    const userCurrent = getCurrentUser(socket.id);

    io.to(userCurrent.room).emit("message", formatMessage(userCurrent.username, msg));

    // Callback function to run in client side
    callback();
  })

  // Runs when clien disconnets
  socket.on("disconnect", () => {
    const userLeft = userLeave(socket.id);

    if (userLeft) {
      io.to(userLeft.room)
        .emit("message", formatMessage(botName, `${userLeft.username} has left the chat`));

      // Send users and room info
      io.to(userLeft.room).emit("roomUsers", {
        room: userLeft.room,
        users: getRoomUsers(userLeft.room)
      });
    }

  });

});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pro-order", { useFindAndModify: false });

// Used server instead of app
server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
