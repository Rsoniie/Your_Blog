import express from "express";
const app = express();

app.get('/', (req, res) => {
    res.send("App is listening in this port");
})

export { app };
