function developmentOnly(req, res, next) {
    if (process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ message: 'This route is only available in development mode.' });
    }
    next();
}

module.exports = developmentOnly;