window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.documentElement.scrollTop > 20) {
        document.getElementById("menu").classList.add("sticky");
    } else {
        document.getElementById("menu").classList.remove("sticky");
    }
}
var isClick =false;
var isClickSearch =false;
document.getElementsByTagName("body")[0].onclick = function(event) {
    
    if(event.target.id === "icon_cart" || event.target.id === "icon_cart_span"){
        if(!isClick){
            document.getElementById("cart_view").style.display = "block";
            isClick = true
        }else{
            document.getElementById("cart_view").style.display = "none";
            isClick = false
        }
    }else{
        document.getElementById("cart_view").style.display = "none";
        isClick = false
    }

    if(event.target.id === "icon_search"){
        if(!isClickSearch){
            document.getElementById("search_view").style.display = "block";
            isClickSearch = true
        }else{
            document.getElementById("search_view").style.display = "none";
            isClickSearch = false
        }
    }else{
        document.getElementById("search_view").style.display = "none";
        isClickSearch = false
    }

    document.getElementsByClassName("search_view")[0].onclick = function(event) {
        event.stopPropagation();
    }
};