const express = require("express");
const app = express();
const path = require('path');
const expressHbs = require('express-handlebars');

app.use(express.static(__dirname + '/html'));

app.engine('hbs', expressHbs.engine({
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'layout',
    extname: 'hbs',
    helpers: {
        encodeURI: function(str) {
            return encodeURIComponent(str);
        },
        getURLQuery: function(query, param, value){
            return '/?' + param + '=' + encodeURIComponent(value);
        },
        currentPageGreaterThanOne: function(currentPage){
            return currentPage > 1;
        },
        currentPageLessThanTotalPages: function(currentPage, totalPages){
            return currentPage < totalPages;
        },
        for: function(from, to, block) {
            console.log(document.getElementsByClassName('product__pagination blog__pagination'));
            console.log(block);
            let accum = '';
            for(let i = from; i <= to; i++) {
                accum += block.fn(i);
            }
            return accum;
        }
    }
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));

const rootRoute = require("./route/root");
const detailRoute = require("./route/detail");

app.use("/", rootRoute);

app.use("/detail", detailRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

app.use((req, res, next) => {
    res.status(404).send('Page not found');
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
