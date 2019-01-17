
const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:YOURPASSWORD@localhost/campus_student");       //ENTER YOUR PASSWORD HERE

const defaultImageURLCampus = "https://simons-rock.edu/_images/why-simons-rock/the-bard-network/bard-and-the-liberal-arts/desktop-mixed-content/1122px-x-642px-video-or-image/bard-and-the-liberal-arts-2.jpg";
const defaultImageURLtudent = "https://scienceoxford.com/wp-content/uploads/2018/03/avatar-male.jpg";

const Campus = sequelize.define ('campus', {
  name: {
    type : Sequelize.STRING,
    allowNull: false,    
  }, 
  imageURL: {
    type : Sequelize.STRING,
    defaultValue: defaultImageURLCampus,   
  }, 
  address: {
    type : Sequelize.STRING,
    allowNull: false,   
  }, 
  description: {
    type : Sequelize.TEXT,
    allowNull: false,    
  },  
})



const Student = sequelize.define ('student', {
    firstName: {
      type : Sequelize.STRING,
      allowNull: false,   
    }, 
    lastName: {
      type : Sequelize.STRING,
      allowNull: false,   
    },
    email: {
      type : Sequelize.STRING,
      allowNull: false, 
      validate: { 
        contains: '@',  
      }    
    },
    imageURL: {
      type : Sequelize.STRING,
      defaultValue: defaultImageURLtudent,   
    }, 
    gpa: {
      type : Sequelize.FLOAT,
      allowNull: false, 
      validate: {
        max: 4.0, 
        min: 0.0,  
      }    
    },  
  })

Campus.hasMany(Student);
Student.belongsTo(Campus);


console.log("Associaltion done");

sequelize.sync()  // {force: true} FORCE ONLY IN NEED TO CLEAR DB
   .then (() => console.log('Campus and Student module synced!'))


 

module.exports = {
    Student: Student, 
    Campus: Campus,
};