const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const userRoutes = require("./routes/user")
// const simulatorRoute = require("./routes/simulator")
// const utilRoutes = require("./routes/util")
// const marketTermRoute = require("./routes/marketTerm")
// const mentorRoute = require("./routes/mentor")
// const newsRoute = require("./routes/news")
// const blogRoute = require("./routes/blog")
// const chartRoute = require("./routes/chart")

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://bennurdarshan:chaiTrade404@cluster0.psgtpad.mongodb.net/?retryWrites=true&w=majority');

const app = express();
var PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json("Welcome to Chai Trade API");
})

app.use('/api/user', userRoutes);
// app.use('/api/simulator', simulatorRoute);
// app.use('/api/util', utilRoutes);
// app.use('/api/marketTerm', marketTermRoute);
// app.use('/api/news', newsRoute);
// app.use('/api/mentor', mentorRoute);
// app.use('/api/blog', blogRoute);
// app.use('/api/chart', chartRoute);

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    } else
        console.log('Server started at port : ', PORT);
})