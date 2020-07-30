const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// Import Routes
const feedbackRoutes = require("./api/routes/feedback");
const applicationRoute = require("./api/routes/application");


// Init Middleware
app.disable('x-powered-by')
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(morgan("dev"));



// ------------
// ROUTES

app.use("/feedback", feedbackRoutes);
app.use("/application", applicationRoute);

// Handle Route Errors
app.use((req, res, next) => {
    const error = new Error("Route Not Found")
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;