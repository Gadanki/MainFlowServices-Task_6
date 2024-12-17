const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const bcrypt = require('bcrypt');
const User = require('./models/User');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
    .connect('mongodb://127.0.0.1:27017/loginSignupDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use('/auth', authRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

app.post('/auth/signup', async (req, res) => {
    console.log('Received data:', req.body); 
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User saved to database'); 

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body; 

    try {

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
 
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  });