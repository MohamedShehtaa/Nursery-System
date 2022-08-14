const fs = require("fs")

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  try {
    console.log(`${res.image}`)
    fs.unlinkSync(`${res.image}`)
  } catch (err) {
    console.error(err)
  }
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
