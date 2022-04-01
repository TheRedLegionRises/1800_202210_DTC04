var currentUser;

function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userEmail = userDoc.data().email;

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("name").value = userName;
        }
        if (userEmail != null) {
          document.getElementById("email").value = userEmail;
          console.log(userEmail);
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

function ContactUs() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        var userName = userDoc.data().name;
        var contactInfo = db.collection("contacts");
        contactInfo
          .add({
            UserID: userID,
            UserName: userName,
            UserEmail: userEmail,
            Subject: document.getElementById("subject").value,
            Message: document.getElementById("message").value,
            Phone: document.getElementById("phone_number").value,
          })
          .then(() => {
            window.location.href = "main.html";
          });
      });
    }
  });
}

//call the function to run it
populateInfo();
