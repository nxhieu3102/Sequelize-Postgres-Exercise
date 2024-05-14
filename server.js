const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
};

const expressHandleBars = require("express-handlebars");

app.use(express.static(__dirname + "/html/"));

// setting handle bars
app.engine(
    "hbs",
    expressHandleBars.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
        },
    })
);

app.set("view engine", "hbs");

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const rootRoute = require("./route/root");
const detailRoute = require("./route/detail");

app.use("/", rootRoute);
app.use("/detail", detailRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
