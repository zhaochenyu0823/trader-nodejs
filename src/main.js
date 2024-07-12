// server/main.js

const app = require("./app");

/* Listening */
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on http://localhost:${process.env.SERVER_PORT}`);
});