const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

http.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});

http.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} already in use. Use a different port or stop the existing server.`);
    } else {
        console.error("Server error:", err);
    }
    process.exit(1);
});