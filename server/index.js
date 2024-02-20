const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');
const simulatorRoute = require('./routes/simulator');
const utilRoutes = require('./routes/util');
const marketTermRoute = require('./routes/marketTerm');
const mentorRoute = require('./routes/mentor');
const newsRoute = require('./routes/news');
const blogRoute = require('./routes/blog');
const chartRoute = require('./routes/chart');
const educationalRoutes = require('./routes/EducationalResources')

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json('Welcome to Chai Trade API');
});

app.use('/api/user', userRoutes);
app.use('/api/simulator', simulatorRoute);
app.use('/api/util', utilRoutes);
app.use('/api/marketTerm', marketTermRoute);
app.use('/api/news', newsRoute);
app.use('/api/mentor', mentorRoute);
app.use('/api/blog', blogRoute);
app.use('/api/chart', chartRoute);
app.use('/api/educationalRoutes', educationalRoutes);


app.listen(PORT, () => {
    console.log('Server started at port:', PORT);
});
