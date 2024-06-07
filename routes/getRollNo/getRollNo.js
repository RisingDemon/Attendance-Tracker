import { connection } from "../../database.js";
import async from "async";
const getRollNo = (request, response) => {
  const { div, roll } = request.body;
  //   const rollNo=roll;
  console.log("in routes");
  // console.log(div);
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("MySQL connected...");
  

  try{
  const checkQuery = `show tables like '${div}%'`;
  connection.query(checkQuery, function (err, result) {
    if (err) {
      console.log(err);
      response
        .status(500)
        .json({ code: 500, message: "Internal server error" });
    } else {
      console.log("found table");
      console.log(result);
      let arr = [];
      async function getRoll() {
        for (let i = 0; i < result.length; i++) {
          await new Promise((resolve, reject) => {
            const tableName = Object.values(result[i])[0];
            console.log(tableName);
            console.log(roll);
            const getRollQuery = `select * from ${tableName} where roll=${roll}`;
            setTimeout(function () {
              connection.query(getRollQuery, function (err, result) {
                if (err) {
                  console.log("in if block");
                  console.log(err);
                  connection.end();
                  response
                    .status(500)
                    .json({ code: 500, message: "Internal server error" });
                } else {
                  console.log("found roll");
                  let obj = {};
                  obj["subject"] = tableName;
                  obj["result"] = result;
                  // copy obj to arr
                  arr.push(obj);
                  //   arr.push(result);
                  //   console.log(obj);
                  console.log(arr);
                  resolve();
                }
              });
            }, 0);
          });
        }
        // convert obj into json
        const myJSON = JSON.stringify(arr);

        response
          .status(200)
          .json({ code: 200, message: "success", data: myJSON });
        //   connection.end();
      }
      getRoll();
    }
  });
}finally{
//   connection.end();
//   console.log("connection closed");
}
});
};

export { getRollNo };
