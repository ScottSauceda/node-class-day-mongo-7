const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user', { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log('Error: ', err);
        return;
    } 
    console.log('MONGODB IS CONNECTED!');
});

const UserSchema = new mongoose.Schema({
    username: { type: String, default: '' },
    password: { type: String, default: '' }
});

const AnimalSchema = new mongoose.Schema({
    animal: { type: String, default: '' },
    gender: { type: String, default: '' }
});

const User = mongoose.model('UserSchema', UserSchema);

const Animal = mongoose.model('AserSchema', AnimalSchema);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

app.get('/signup', function(req, res) {
    User.find({}, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Failure',
                message: err
            });
            return;
        }
        res.json({
            confirmation: 'success',
            data: result
        });
        return;
    });
});

app.post('/signup', function(req, res) {
    User.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Failure',
                message: err
            });
        }
        res.json({
            confirmation: 'success',
            data: result
        });
    });
});



app.post('/createanimal', function(req, res) {
    Animal.create(req.body, function(err, result) {
        if (err) {
            res.json({
                confirmation: 'Failure',
                message: err
            });
        }
        res.json({
            confirmation: 'success',
            data: result
        });
    }); 
});

app.get('*', function(req, res) {
    res.send('Page does not exist. Check your url');
});


app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Server is now running on PORT ${port}`);
});
