var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); 

const SECRET_KEY = 'secretkey';

// Endpoint untuk login
router.post('/login', async function(req, res, next) {
  const { email, password } = req.body;
  
  try {
    // Temukan pengguna berdasarkan email
    const user = await User.findOne({ where: { email: email } });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Periksa password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid email or password' });

    // Buat token
    const accessToken = jwt.sign({ id: user.id, role: user.role, email:user.email}, SECRET_KEY);
    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

// Endpoint untuk register
router.post('/register', async function(req, res, next) {
  const { nama, email, password, role } = req.body;
  
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Buat pengguna baru
    const newUser = await User.create({
      nama: nama,
      email: email,
      password: hashedPassword,
      role: role
    });

    res.status(201).json({ message: 'User created successfully', userId: newUser.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
