eater_type_array = ['omnivoreInput', 'veganInput', 'vegetarianInput', 'lowcarbInput', 'nosugarInput', 'pescetarianInput']
cuisine_type_array = ['French', 'Italian', 'Greek', 'Spanish', 'Mediterranean', 'Lebanese', 'Moroccan', 'Turkish', 'American', 'Chinese', 'Indian', 'Japanese', 'Korean', 'Thai', 'Vietnamese']

let eater_type = null
let cuisine_type = null
var currentUser

function preCheckBoxes() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid) //global
            // console.log(currentUser)
            currentUser.get()
                .then((doc) => {
                    eater_type = doc.data().eater_type
                    cuisine_type = doc.data().cuisine_type

                    for (i = 0; i < eater_type_array.length; i++) {
                        value = document.getElementById(eater_type_array[i]).value
                        if (eater_type.includes(value)) {
                            // console.log(i)
                            document.getElementById(eater_type_array[i]).checked = true
                        }
                    }

                    for (i = 0; i < cuisine_type_array.length; i++) {
                        value = document.getElementById(cuisine_type_array[i]).value
                        if (cuisine_type.includes(value)) {
                            // console.log(i)
                            document.getElementById(cuisine_type_array[i]).checked = true
                        }
                    }
                })
            // console.log(eaterType)

        } else {
            // No user is signed in.
            console.log("No user is signed in")
            window.location.href = "login.html"
        }
    })
}

function updateUserPreference() {
    for (let i = 0; i < eater_type_array.length; i++) {
        value = document.getElementById(eater_type_array[i]).value
        if (document.getElementById(eater_type_array[i]).checked) {
            currentUser.update({
                eater_type: firebase.firestore.FieldValue.arrayUnion(value)
            })
        } else {
            currentUser.update({
                eater_type: firebase.firestore.FieldValue.arrayRemove(value)
            })
        }
    }
    for (let i = 0; i < cuisine_type_array.length; i++) {
        value = document.getElementById(cuisine_type_array[i]).value
        if (document.getElementById(cuisine_type_array[i]).checked) {
            currentUser.update({
                cuisine_type: firebase.firestore.FieldValue.arrayUnion(value)
            })
        } else {
            currentUser.update({
                cuisine_type: firebase.firestore.FieldValue.arrayRemove(value)
            })
        }
    }
    // document.getElementById('eaterTypeInfoFields').disabled = true
    // document.getElementById('cuisineInfoFields').disabled = true
    $("#preference_alert").show()
}


function populateWithPreference() {
    $("#RestaurantCardGroup").empty();
    db.collection("restaurant")
        .limit(10)
        .get()
        .then(AllRestaurants => {
            AllRestaurants.forEach(doc => {
                restaurant_eater_type = doc.data().eater_type
                restaurant_cuisine_type = doc.data().cuisine_type
                if (eater_type.some(eater => restaurant_eater_type.includes(eater)) && cuisine_type.some(cuisine => restaurant_cuisine_type.includes(cusine))) {
                    console.log("1")
                }
                // console.log(restaurant_cuisine_type)
                // console.log(restaurant_eater_type)
            })
        })
}

$("#preference_alert").hide()
preCheckBoxes()