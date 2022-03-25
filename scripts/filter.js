function write_filters(){
    var filtersRef = db.collection("Filters");

    filtersRef.add({
        code: "SUSHI",
        filterName: "Sushi",
        cuisineType: "Asian",
        selected: 0,

    });

    filtersRef.add({
        code: "HMBRGR",
        filterName: "Hamburgers",
        cuisineType:"Western",
        selected: 0,

    });

    filtersRef.add({
        code: "BBT",
        filterName: "Bubble Tea",
        cuisineType: "Asian",
        selected: 0,

    });

    
}

function displayFilters() {
    let filterOptionsTemplate = document.getElementById("filterOptionsTemplate");
    let filterOptionsTab = document.getElementById("filter_options_tab");
    
    db.collection("Filters").get()
        .then(allFilters => {
            allFilters.forEach(doc => {
                console.log(doc.data().code);
                var filterName = doc.data().filterName; //gets the name field
                var filterCode = doc.data().code; //gets the unique ID field
                // console.log(test)
                // var test1 = !test;

                
                //console.log(filterCode)
                // var hikeLength = doc.data().length;


                let testFilterButton = filterOptionsTemplate.content.cloneNode(true);
                testFilterButton.querySelector(".filter_button").innerHTML = filterName;
                //testFilterButton.querySelector('a').onclick = () => setFilterData(filterCode);
                //this is the line added so that it makes the icon clickable and call another function
                testFilterButton.querySelector('.filter_button').onclick = () => addTimesUsed(filterCode, filterName);
                //testFilterButton.querySelector(".filter_button").onclick = () => displaySelected(filterName);
                filterOptionsTab.appendChild(testFilterButton);

                
            })

        })
}

displayFilters();

function displaySelected(filterName){
    $(".selected_filter_button").remove();

    let filterSelectedTemplate = document.getElementById("selectedOptionsTemplate");
    let filterSelectedTab = document.getElementById("selected_filters");

    // db.collection("Filters").get()
    // .then(allFilters => {
    //     allFilters.forEach(doc => {

    //         let selectFilterButton = filterSelectedTemplate.content.cloneNode(true);
    //         selectFilterButton.querySelector(".selected_filter_button").innerHTML = filterName;
    //         //selectFilterButton.querySelector(".filter_button").onclick = () =>
    //         filterSelectedTab.appendChild(selectFilterButton)
            
    //     })
    // })

    let selectFilterButton = filterSelectedTemplate.content.cloneNode(true);
    selectFilterButton.querySelector(".selected_filter_button").innerHTML = filterName;
    //selectFilterButton.querySelector(".filter_button").onclick = () =>
    filterSelectedTab.appendChild(selectFilterButton)

}

function addTimesUsed(filterCode, filterName) {  
    console.log("inside");


    db.collection("Filters").where("code", "==", filterCode)
    .get()
    .then(queryFilter => {
        //see how many results you have got from the query
        size = queryFilter.size;
        // get the documents of query
        Filters = queryFilter.docs;

        // test
        if (size == 1) {
            id = Filters[0].id;
            var select = Filters[0].data().selected;

            if (select == 0){
                select += 1;
            }
            

            else{
                select -= 1;
            }


            //select = (select + 1) % 2

            // db.collection("Filters").get()
            // .then(nextStep => {
            //     nextStep.forEach(doc =>{

            //         console.log(doc.data().code);

            //     })
            // })

            
            //update method will add to the specified field in database, if that field does not exist, it will create that.

            // localStorage.setItem("SelectedRestaurant", filterCode);
            // test = localStorage.getItem("SelectedRestaurant");
            // console.log(test);

            db.collection("Filters").doc(id).update({
                //Firebase documentation has this method for incrementation.
                // scores: firebase.firestore.FieldValue.increment(1)
                //timesUsed: firebase.firestore.FieldValue.increment(1)
                selected: select

            })

        } else {
            console.log("Query has more than one data")
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    displaySelected(filterName);
    displayRestaurants(filterCode);
}

function displayRestaurants(filterCode){
    $(".restaurantNames").remove();

    db.collection("restaurant").where("filter", "==", filterCode)
    .get()
    .then(queryFilter => {
        //see how many results you have got from the query
        size = queryFilter.size;
        console.log(size);
        // get the documents of query
        restaurants = queryFilter.docs;
        
        var x = 0;
        
        // db.collection("restaurant").where()
        for (i = 0; i < size; i++){
            restaurantName = restaurants[i].data().name;
            console.log(restaurantName);
            $("#restaurant_suggestions").append("<p class='restaurantNames'>" + restaurantName + "</p>");
        }
        console.log(x);

})}

// while (true){
//     displayRestaurants();
// }

function hide(){
    $(this).remove();
}

function setup(){
    console.log("Start Setup");
    $("body").on("click", ".selected_filter_button", hide);

}

jQuery(document).ready(setup);