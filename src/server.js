const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
var corsOption = {
    origin: ['*'],
    credentials: true
};

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = require("./models");

db.sequelize.sync();

require("./routes/user.routes")(app);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
/*
const Sequelize = require('sequelize');
const db = {};

let sequelize = new Sequelize('owl', 'admin', 'howken7224', {
                    host: 'owl.cluster-cruqmpby0qsp.ap-northeast-2.rds.amazonaws.com',
                    port: 3306,
                    logging: console.log,
                    maxConcurrentQueries: 100,
                    dialect: 'mysql',
                    dialectOptions: {
                        ssl: 'Amazon RDS'
                    },
                    pool: { 
                        maxConnections: 5,
                        maxIdleTime: 30
                    },
                    language: 'kr'
                });

db.Sequelize = Sequelize;
db.

*/