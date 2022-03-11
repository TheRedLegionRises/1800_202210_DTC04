function writeReview() {
  var currentRestaurant = db.collection("reviews");

  currentRestaurant
    .add({
      Title: document.getElementById("title").value, //get the value of the field with id="nameInput"
      Level: document.getElementById("level").value, //get the value of the field with id="schoolInput"
      Price: document.getElementById("price").value,
      Description: document.getElementById("description").value,
    })
    .then(() => {
      window.location.href = "main.html";
    });
}
