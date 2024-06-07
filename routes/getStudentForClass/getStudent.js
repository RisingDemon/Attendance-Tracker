import { connection } from "../../database.js";
const getStudents = (request, response) => {
    const {tName} = request.body;
    console.log("in routes");
    console.log(tName);
    connection.connect((err) => {
        if (err) {
          console.error("error connecting: " + err.stack);
          return;
        }
        console.log("MySQL connected...");
      
      
      const checkQuery=`select * from ${tName} order by roll`;
      connection.query(checkQuery, function (err, result) {
        if (err) {
          console.log(err);
          response
            .status(600)
            .json({ code: 600, message: "Internal server error" });
        } else {
            console.log(result);
            response.status(200).json(result);
            // console.log("table already present");
        }
    });
  });
};
export{getStudents};
