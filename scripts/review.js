function writeReview() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      currentUser.get().then((userDoc) => {
        var userEmail = userDoc.data().email;
        var currentRestaurant = db.collection("reviews");
        currentRestaurant
          .add({
            UserID: userID,
            UserEmail: userEmail,
            Title: document.getElementById("title").value,
            Level: document.getElementById("level").value,
            Price: document.getElementById("price").value,
            Description: document.getElementById("description").value,
          })
          .then(() => {
            window.location.href = "main.html";
          });
      });
    }
  });
}
