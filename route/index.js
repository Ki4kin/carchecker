const express = require('express');
const { model } = require('../middleware/db-connect');
const router = express.Router();
const User = require('../models/users');
const { sessionChecker } = require('../middleware/auth');
const bcrypt = require('bcrypt');
const path = require('path');
const { Router } = require('express');
const saltRounds = 2


router.get('/', (req, res) => {
   if (req.session.user) {                          //проверка на наличие сессии
    let username = req.session.user.username;
    return  res.render('index', { username } ) 
   }
   res.render('index')
})


router.get('/signup', (req, res) => {
  if (req.session.user) {
    return  res.redirect('cabinet');
  }
  res.render('signUp')
})

router.get('/login', (req, res) => {
  res.render('login')
})


// ============РЕГИСТРАЦИЯ=====================

router.post('/signup', async (req, res, next) => {
  try{
    const {
      name,
      password,
      email,
    } = req.body
    
    const user = new User({
      username: name,
      password: await bcrypt.hash(password, saltRounds),
      email,
    })

    await user.save()
    req.session.user = user;
    console.log(req.session.user);
    res.send('UDACHNO')
  }

  catch (error) {
    next(error)
  }
})

// =================LOGIN===========================

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;                               // получаем данные из формы
  let user = await User.findOne ( {email} )                           // находим юзера в базе

  if (user && (await bcrypt.compare(password, user.password) ) ) {    // сверяем введеный пароль и пароль из базы
    req.session.user = user                                           // создаем сессию
    return res.redirect('/')
  }
  res.render('error')
})


// =================LOGOUT==========================
router.get('/logout', async (req, res, next) => {

  if (req.session.user) {
    try {
      await req.session.destroy();        // уничтожение сессии (удаление файла)
            res.clearCookie('user_sid');  // чистим куку (удаление в браузере)
            res.redirect('/');            // перенаправляемся на корень
    } catch (error) {
      next(error);                         // улетаем в обработчик ошибок (middleware/error-handlers)
    }
  }
})

module.exports = router;

