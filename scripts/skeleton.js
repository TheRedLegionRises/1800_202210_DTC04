//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#nav_main').load('./header_main.html'));
    console.log($('#nav_index').load('./header_index.html'));
    console.log($('#footerPlaceholder').load('./footer.html'));
}
loadSkeleton();  //invoke the function
