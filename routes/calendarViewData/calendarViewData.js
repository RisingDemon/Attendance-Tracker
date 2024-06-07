import { connection } from "../../database.js";
const getCalenderData = (request, response) => {
  const { dayId, tbName } = request.body;
  console.log("in routes");
  console.log(dayId);

  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("MySQL connected...");
  });
  
  //   const checkQuery=`select firstName, lastName, phone, prn, classs, division, roll, ${dayId} as date from ${tbName}`;
  const checkQuery = `select * from ${tbName}`;
  if(connection.connect())
  { 
    console.log("connection established");
  }
  else{
    console.log("connection not established");
  }
  connection.query(checkQuery, function (err, result) {
    if (err) {
      console.log("error");
      console.log(err);
      // check if connection is open
      if(connection)
        connection.end();
      console.log("connection ended");
      response
        .status(500)
        .json({ code: 500, message: "Internal server error" });
    } else {
      try {
        console.log(result);
        console.log("result printed");
        // connection.end();
        console.log("connection ended");
        response
          .status(200)
          .json({ code: 200, message: "success", data: result });
      } catch (err) {
        console.log("in catch");
        console.log(err);
        // connection.end();
        // response
        //   .status(500)
        //   .json({ code: 500, message: "Internal server error" });
      } finally {
        console.log("finally");
        connection.end();
        console.log("connection ended");
      }
    }
  });
  // connection.end();
};
export { getCalenderData };
