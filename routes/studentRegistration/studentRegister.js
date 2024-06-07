import { connection } from "../../database.js";
const studInfoRoutes = (request, response) => {
  const studInfo = request.body;
  const {
    name,
    lname,
    phone,
    dob,
    add,
    // add2,
    city,
    state,
    pin,
    prn,
    classs,
    div,
    roll,
    // country,
    // clg,
    email,
  } = studInfo;
  console.log("in routes");
  console.log(studInfo);

  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("MySQL connected...");
  
  // connection.end();
  
  const checkQuery = `select * from studentinfo where prn="${prn}"`;
  connection.query(checkQuery, function (err, result) {
    if (err) {
      console.log(err);
      response
        .status(600)
        .json({ code: 600, message: "Internal server error" });
    } else {
      if (result.length == 0) {
        const insertQuery = `insert into studentinfo values("${name}","${lname}","${phone}","${dob}","${add}","${city}","${state}","${pin}","${prn}","${classs}","${div}","${roll}","${email}")`;
        connection.query(insertQuery, function (err) {
          if (err) {
            console.log(err);
            response
              .status(500)
              .json({ code: 500, message: "Internal server error" });
          } else {
            console.log("user registered");
            console.log("findinng table");
            // const findTableQuery = `select * from information_schema.tables where table_name like '${div}%'`;
            const findTableQuery = `show tables like '${div}%'`;
            connection.query(findTableQuery, function (err, result) {
              if(err){
                console.log("failed to find table");
                console.log(err);
              }
              else{
                console.log("found table");
                console.log(result);
                // for each table found add the new student
                result.forEach((table) => {
                  console.log(table);
                  const tableName = Object.values(table)[0];
                  console.log(tableName);
                  const addRowQuery = `insert into ${tableName} values("${name}","${lname}","${phone}","${prn}","${classs}","${div}","${roll}")`;
                  connection.query(addRowQuery, function (err) {
                    if (err) {
                      console.log(err);
                      console.log("error adding row");
                    } else {
                      console.log("added rows");
                    }
                  });
                });
              }

            });
            response
              .status(200)
              .json({ code: 200, message: "User registered successfully" });
          }
        });
      } else {
        response
          .status(300)
          .json({ code: 300, message: "User already registered" });
      }
    }
  });
});
};
export { studInfoRoutes };
