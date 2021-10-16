var firebaseConfig = {
    apiKey: "AIzaSyB9mwm0wDUQvfpphHu4ynze2Eg3On1xs7E",
  authDomain: "made4you-60f12.firebaseapp.com",
  projectId: "made4you-60f12",
  storageBucket: "made4you-60f12.appspot.com",
  messagingSenderId: "732259221210",
  appId: "1:732259221210:web:39a7c70c924aba239a6fe3",
  measurementId: "G-9T5LTD1GP2"
  };

  firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
var rootRef = firebase.database().ref().child("forms");
var AllForms = [];

$("#saveForm").click(function () {
//   console.log(rootRef);

  database.collection("forms").add({
    name: $("#inputname").val(),
    company: $("#inputcompany").val(),
    email: $("#inputemail").val(),
    phone: $("#inputphone").val(),
    message: $("#inputmessage").val(),
  });
  alert("Sucessfully Submitted");
});

function validateEmail() {
    var emailID = document.contactForm.email.value;
    atpos = email.indexOf("@");
    dotpos = email.lastIndexOf(".");
    
    if (atpos < 1 || ( dotpos - atpos < 2 )) {
       alert("Please enter correct email ID")
       document.contactForm.email.focus() ;
       return false;
    }
    return( true );
 }

var forms = database.collection("forms");
const form_info = document.querySelector("#form-info");
var count=1;

function deleteForm(email) {
    console.log(email + " from deleteUser");
    var dform;
    forms
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().email == email) {
            dform = doc.id;
            firebase.auth().delete(dform);
            database.collection("forms").doc(dform).delete();
          }
        });
      })
      // .then(()=>{
      //   window.location.reload()
      // })
      .catch((err) => {
        console.log("Error deleting data", err);
      });
  }

var form = forms
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      var fcount = count;
      count++;

      var name = doc.data().name;
      var email = doc.data().email;
      var phone = doc.data().phone;
      var message = doc.data().message;
      var company = doc.data().company;
      var currentForm = { name,email,phone,message,company};
      AllForms.push(currentForm);

      form_info.innerHTML +=
        "<tr>" +
        "<td>" +
        fcount +
        "</td>" +
        "<td>" +
        name +
        "</td>" +
        "<td>" +
        email +
        "</td>" +
        "<td>" +
        phone +
        "</td>" +
        "<td>" +
        company +
        "</td>" +
        "<td>" +
        message +
        "</td>" +
        // '<td><input onClick="openModal(' +
        // ucount +
        // ')" type="button" class="add btn btn-primary"  value="Edit" data-toggle="modal" data-target="#userupdate"></input>' +
        // " " +
        '<td><input type="button" class="add btn btn-danger" value= "Delete" id=' +
        email +
        ' onClick = "deleteForm(this.id)"></input></td>' +
        "</tr>";
    });
  })
  .then(() => {
    console.log(AllForms);
  })
  .catch((err) => {
    console.log("Error fetching data", err);
  });