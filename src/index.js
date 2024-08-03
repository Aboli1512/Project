const express = require("express");
const {PORT} = require("./config/serverConfig");
const {mongoConnect} = require("./config/dbconfig");
const {appRouter} = require("./routes/index");
const {errorHandler} = require("./middleware/error");
const cookieParser = require("cookie-parser");
const verifyToken = require("./middleware/verifyToken");
const path = require("path");

const setUpAndStartServer = async () =>
{
    const app = express();
    const port = PORT || 4200;

    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(errorHandler);
    app.use(cookieParser());
    app.use("/uploads",express.static(path.join(__dirname,"uploads")));

    //For Routes
    app.use("/api",appRouter);

    await mongoConnect();

    app.listen(port,()=>
    {
        console.log("Server is running on port " + port);
    });
};

setUpAndStartServer();