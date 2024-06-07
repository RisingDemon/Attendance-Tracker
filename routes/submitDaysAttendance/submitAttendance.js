import { connection } from "../../database.js";
const submitAttendance = (request, response) => {
  const { rollArr, tableName } = request.body;
  console.log("in routes");
  console.log(rollArr);
  console.log(tableName);
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("MySQL connected...");
  
  // get todays date
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  // add D to the date
  // today = "D-" + today;
  console.log(today);
  // add a new column to the table with todays date
  const addColumnQuery = `ALTER TABLE ${tableName} ADD \`${today}\` VARCHAR(10) NOT NULL DEFAULT 'A'`;
  connection.query(addColumnQuery, function (err) {
    if (err) {
      console.log(err);
      response
        .status(500)
        .json({ code: 500, message: "Internal server error" });
    } else {
      console.log("added column");
      for (let i = 0; i < rollArr.length; i++) {
        const updateQuery = `UPDATE ${tableName} SET \`${today}\` = 'P' WHERE roll = ${rollArr[i]}`;
        connection.query(updateQuery, function (err) {
          if (err) {
            console.log(err);
            response
              .status(500)
              .json({ code: 500, message: "Internal server error" });
          } else {
            console.log("updated");
          }
        });
      }
      response.status(200).json({ code: 200, message: "success" });

      // connection.end();
    }
  });
});
};
export { submitAttendance };
