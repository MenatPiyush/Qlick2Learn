const db = require('../../config/db');

const Profile = function(user) {
    this.userId = user.userId;
    this.degree1 = user.degree1;
    this.degree2 = user.degree2;
    this.degree3 = user.degree3;
    this.school1 = user.school1;
    this.school2 = user.school2;
    this.school3 = user.school3;
    this.company1 = user.company1;
    this.company2 = user.company2;
    this.company3 = user.company3;
    this.post1 = user.post1;
    this.post2 = user.post2;
    this.post3 = user.post3;
    this.years1 = user.years1;
    this.years2 = user.years2;
    this.years3 = user.years3;
    this.github = user.github;
    this.linkedin = user.linkedin;
    this.contact = user.contact;
    this.skill1 = user.skill1;
    this.skill2 = user.skill2;
    this.skill3 = user.skill3;
    this.skill4 = user.skill4;
    this.skill5 = user.skill5;
    this.age = user.age;
    this.totalexperience = user.totalexperience;
};

Profile.displayProfile = (user, result) => {
    const query = "SELECT ui.*, u.firstname,u.lastname,u.email FROM userinfo AS ui ,user AS u WHERE u.id='"+user+"' AND ui.userId='"+user+"';";
    console.log(query);
    db.query(query, (err, res) => {
      if (err) {
        console.log("error in Displaying Profile Login: ", err);
        result(err, null);
        return;
      }
      if(res.length){
        console.log("Profile retrieved from DB", res[0]);
        result(null, res[0]);
        return;
      }
      console.log("User does not exist");
      result(err,null);
    });
}

Profile.editProfile = (user, result) => {
  const query = "UPDATE userinfo SET degree1='"+user.degree1+"',degree2='"+user.degree2+"',degree3='"+user.degree3+"',school1='"+user.school1+"',school2='"+user.school2+"',school3='"+user.school3+"', company1='"+user.company1+"', company2='"+user.company2+"', company3='"+user.company3+"', post1='"+user.post1+"',post2='"+user.post2+"',post3='"+user.post3+"', years1='"+user.years1+"',years2='"+user.years2+"',years3='"+user.years3+"',github='"+user.github+"',linkedin='"+user.linkedin+"',badge1='"+user.badge1+"',badge2='"+user.badge2+"',badge3='"+user.badge3+"',phone='"+user.contact+"',skill1='"+user.skill1+"',skill2='"+user.skill2+"',skill3='"+user.skill3+"',skill4='"+user.skill4+"',skill5='"+user.skill5+"',age='"+user.age+"',totalExperience='"+user.totalexperience+"' WHERE userId='"+user.userId+"' ";
  console.log(query);
  db.query(query, (err, res) => {
    if (err) {
      console.log("error in Editting the Profile: ", err);
      result(err, null);
      return;
    }
    if(res.affectedRows == 0){
      console.log("Profile cannot be retrieved from DB");
      result({errmessage:Notfound}, null);
      return;
    }
    console.log("Updated Customer",{id:user.id});
    result(null,{id:user.userId});
  });
}

module.exports = Profile;