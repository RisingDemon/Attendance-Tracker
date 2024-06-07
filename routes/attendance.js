import {connection} from "../database.js"
const getAttendance =(request,response)=>{
    const classInfo = request.body;
    const {div,sub} = classInfo;
    console.log("in routes");
    console.log(classInfo);
    connection.connect((err)=>{
        if(err){
            console.error("error connecting: "+ err.stack);
            return;
        }
        console.log("MySQL connected...");
    
    const getQuery = `select * from ${div}_${sub}`;
    connection.query(getQuery,function(err,result){
        if(err){
            console.log(err);
            response.status(500).json({code:500,message:"Internal server error"});
        }
        else{
            console.log(result);
            response.status(200).json({code:200,message:"Success",result:result});
        }
    });
});
}
export {getAttendance};