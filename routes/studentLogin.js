import {connection} from "../database.js";
const getStudInfo = (request, response) => {
    // const studInfo = request.body;
    const { prn } = request.body;
    console.log("in routes");
    //   console.log(teachInfo);
    connection.connect((err) => {
        if (err) {
        console.error("error connecting: " + err.stack);
        return;
        }
        console.log("MySQL connected in student login...");
    
    const checkQuery = `select * from studentinfo where prn="${prn}"`;
    connection.query(checkQuery, function (err, result) {
        if (err) {
        console.log(err);
        response
            .status(600)
            .json({ code: 600, message: "Internal server error" });
        } else {
        if(result.length == 0) {
            console.log("user not registered");
            response
            .status(300)
            .json({ code: 300, message: "User not registered" });
        } else {
            console.log("user logged in");
            response
            .status(200)
            .json({ code: 200, message: "User logged in successfully" });
        }
        }
    });
});
};
export { getStudInfo };