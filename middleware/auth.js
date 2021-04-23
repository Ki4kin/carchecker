function cookiesCleaner(req, res, next) {
  // если есть кука и нет сессии - удаляем куку
  if (req.cookies.user_sid && (!req.session.user)) {
    res.clearCookie("user_sid");
  }
  next();
}

// middleware функция дял проверки наличия сессии
const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    console.log('there is a session!!');
    res.redirect("/");
  } 
  else {
    next();
  }
};

module.exports = {
  sessionChecker,
  cookiesCleaner,
};

