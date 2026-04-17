const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running.");
})

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data.room);

        const path = `./chatlogs/${data.room}.json`

        if(!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));
        }

        const logs = JSON.parse(fs.readFileSync(path, 'utf8'))
        socket.emit("chat_logs", logs);
    });

    socket.on("send_message", (data) => {
        const path = `./chatlogs/${data.room}.json`;

        let logs = [];

        if(fs.existsSync(path)) {
            logs = JSON.parse(fs.readFileSync(path, 'utf8'));
        }

        logs.push(data);

        fs.writeFileSync(path, JSON.stringify(logs));

        io.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
