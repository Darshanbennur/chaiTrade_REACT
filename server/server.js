const { app } = require("./index.js")

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server started at port:', PORT);
});
