// import mysql from "mysql";
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// const agent = new http.Agent({ keepAlive: true, keepAliveMsecs: 15000 });

// Create a connection to the database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000,
    // agent: agent,
    // port: process.env.PORT,
    // insecureAuth: true,
});


// connection.connect((err) => {
//     if (err) {
//         console.error("error connecting: " + err.stack);
//         return;
//     }
    
//     console.log("MySQL connected...");
// });
// connection.timeout = 10000;

export {connection};