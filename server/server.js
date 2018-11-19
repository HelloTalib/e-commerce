const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;


// Modals

const User = require('./modals/user');

mongoose.connect("mongodb://localhost:27017/e-commerce", { useNewUrlParser: true, useCreateIndex: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/users/register', (req, res) => {
  let user = new User(req.body);
  user.save((err, success) => {
    if (err) {
      res.status(500).json({ success: false, err });
    } else {
      res.json({ success: true, userdata: success })
    }
  });
});

app.post('/api/users/login', (req, res) => {
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (!user)
     return res.json({ loginSuccess: false, Message: 'Auth failes, email not found' });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({loginSucccess: false, message: 'Unknown Password'});
    })
  })
})




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});