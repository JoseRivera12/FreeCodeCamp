const exerciseCtrl = {};

const User = require("../models/User");
const Exercise = require("../models/Exercise");

//create a new exercise receive userId, description, duration, date?
exerciseCtrl.newExercise = (req,res) => {
    let date = req.body.date
    if(date=="")
      date = new Date().toISOString().substring(0, 10)
    let exercise = new Exercise({description:req.body.description, duration:req.body.duration, date:date}); 
    User.findByIdAndUpdate(req.body.userId, 
      {$push : {log: exercise}},
      {new: true},
      (error, updatedUser)=> {
        if(!error)
          res.json({_id:updatedUser._id, username:updatedUser.username, date: new Date(date).toDateString(), duration:exercise.duration, description:exercise.description});
    });
};
  
//get logs by userId
exerciseCtrl.getLogs = (req, res) => {
    User.findById(request.query.userId, (error, result) => {
      if(!error){
        let responseObject = result
        if(req.query.from || req.query.to){
          let fromDate = new Date(0)
          let toDate = new Date()
          if(req.query.from)
            fromDate = new Date(req.query.from)
          if(req.query.to)
            toDate = new Date(req.query.to)
          fromDate = fromDate.getTime()
          toDate = toDate.getTime()
          responseObject.log = responseObject.log.filter((session) => {
            let sessionDate = new Date(session.date).getTime()
            return sessionDate >= fromDate && sessionDate <= toDate
          })
        }
        if(req.query.limit)
          responseObject.log = responseObject.log.slice(0, req.query.limit)
        responseObject = responseObject.toJSON()
        responseObject['count'] = result.log.length
        res.json(responseObject)
      }
    })
};

module.exports = exerciseCtrl;