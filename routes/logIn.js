import { connection } from "../database.js";
const getTeachInfo = (request, response) => {
  // const teachInfo = request.body;
  const { email, password } = request.body;
  console.log("in routes");
  //   console.log(teachInfo);
  connection.connect((err) => {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("MySQL connected in teacher login...");
  
  const checkQuery = `select * from teacherInfo where email="${email}"`;
  connection.query(checkQuery, function (err, result) {
    if (err) {
      console.log(err);
      response
        .status(600)
        .json({ code: 600, message: "Internal server error" });
    } else {
      const passwordQuery = `select password from teacherInfo where email="${email}"`;
      connection.query(passwordQuery, function (err, result) {
        if (err) {
          console.log(err);
          response
            .status(600)
            .json({ code: 600, message: "Internal server error" });
        } else {
          if (result.length == 0) {
            console.log("user not registered");
            response
              .status(300)
              .json({ code: 300, message: "User not registered" });
          } else {
            if (result[0].password == password) {
              console.log("user logged in");
              response
                .status(200)
                .json({ code: 200, message: "User logged in successfully" });
            } else {
              console.log("password incorrect");
              response
                .status(400)
                .json({ code: 400, message: "Password incorrect" });
            }
          }
        }
      });

    }
  });
});
};
export { getTeachInfo };
