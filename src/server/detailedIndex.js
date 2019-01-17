const router = require("express").Router();
const {Student, Campus}= require('./campus_student');
module.exports = router;


router.get("/campus", (req, res) => {
    Campus.findAll({raw: true})
      .then(campus => {
        console.log("Every campus:");
        console.log(campus);
        res.json(campus);
      })
});

router.post("/campus", (req, res) => {
  let { name, imageURL, address, description} = req.body;
  Campus.create({name: name, imageURL: imageURL, address: address, description: description})
  .then(elem => {
    console.log(elem)
    res.json(elem);
  })

});

router.delete("/campus/:campusID", (req, res) => {
  let { campusID } = req.params;
  Campus.destroy({
    raw: true,
    where: {
      id : campusID
    }
  })
  .then(input => {
    console.log(`Deleted campus with ID = ${campusID}`);
    //console.log(input);
    res.json(input);
  })
});  



router.get("/student", (req, res) => {
  Student.findAll({raw: true})
    .then(student => {
      console.log("Every student:");
      console.log(student);
      res.json(student);
    })
});




router.post("/student", (req, res) => {
  let { firstName, lastName, email, imageURL, gpa, campusID} = req.body;
  gpa = parseFloat(gpa);
  campusID = parseFloat(campusID);
  console.log("Creaction");
  Student.create({ firstName: firstName, lastName: lastName, email: email, imageURL:imageURL, gpa: gpa})
  .then (elem => {
    elem.setCampus(campusID);
  })
  .then(elem => {
    console.log(elem)
    res.json(elem);
  })
});


router.delete("/student/:studentID", (req, res) => {
  let { studentID } = req.params;
  Student.destroy({
    raw: true,
    where: {
      id : studentID
    }
  })
  .then(input => {
    console.log(`Deleted student with ID = ${studentID}`);
    //console.log(input);
    res.json(input);
  })
}); 






