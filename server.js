//#region dependencies 

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config()

//#endregion dependencies 

//#region projectDeps 

const notFound = require("./middleware/notFoundMiddleware")
const errorHandler = require("./middleware/errorMiddleware")
const classRoute = require("./routes/classRoute")
const studentRoute = require("./routes/studentRoute")
const teacherRoute = require("./routes/teacherRoute")

//#endregion projectDeps 



const app = express();


const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: ["http://localhost:8080"]
    }
  },
  // ['.routes/*.js']
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use(studentRoute);
app.use(classRoute);
app.use(teacherRoute);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
