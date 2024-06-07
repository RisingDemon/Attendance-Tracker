import { connection } from "../../database.js";
const classCheckRoutes = (request, response) => {
    const classCheck = request.body;
    const { div,sub } = classCheck;
    console.log("in routes");
    console.log(classCheck);
    connection.connect((err) => {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
        console.log("MySQL connected...");
      
    const checkQuery = `select * from information_schema.tables where table_name = '${div}_${sub}'`;
    // check if table is already present
    connection.query(checkQuery, function (err, result) {
        if (err) {
          console.log(err);
          response
            .status(600)
            .json({ code: 600, message: "Internal server error" });
        } else {
          if (result.length > 0) {
            console.log(result);
            console.log("table already present");
            // add extra rows into the table
            // const addRowQuery = `insert into ${div}_${sub} select firstName, lastName, phone, prn, classs, division, roll FROM studentinfo WHERE division='${div}'`;
            // connection.query(addRowQuery, function (err) {
            //   if (err) {
            //     console.log(err);
            //     response
            //       .status(500)
            //       .json({ code: 500, message: "Internal server error" });
            //   } else {
            //     console.log("added rows");
                response
                  .status(200)
                  .json({ code: 200, message: "Diverting" });
            //   }
            // });
        }
          else{
              // if table is not present
              // create table
              console.log("table is not present");
              // create a new table
              // const createQuery = `create table ${div}_${sub} (prn BIGINT primary key, name varchar(20), lname varchar(20), class varchar(2), div varchar(1), roll INT)`;
            //   const createQuery= `SELECT firstName, lastName, phone, prn, classs, division, roll INTO '${div}_${sub}' FROM studentinfo WHERE division='${div}'`;
              const createQuery= `create table ${div}_${sub} as select firstName, lastName, phone, prn, classs, division, roll FROM studentinfo WHERE division='${div}'`;
              connection.query(createQuery, function (err) {
                  if (err) {
                      console.log(err);
                      response
                          .status(500)
                          .json({ code: 500, message: "could not create table" });
                  } else {
                      response
                          .status(200)
                          .json({ code: 200, message: "table created successfully" });
                  }
              });
          }
        }
    });
  });
};
export { classCheckRoutes };