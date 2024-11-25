const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = 3000;

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Connected!');
})
// app.post('/login/student', (req, res) => {
//     res.send('Connected!');
// })

const apiRouter = require('./routes');
app.use('/api', apiRouter)


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('Server error!');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}...`);
});