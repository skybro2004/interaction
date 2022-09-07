const main = document.querySelector("main")
var scrollTimer = null


main.addEventListener("scroll", function() {
    if(scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(function(){
        var i = 0
        for(element of main.children){
            if(element.getBoundingClientRect().left==0){
                document.querySelector(".focus").classList.remove("focus")
                element.classList.add("focus")
                document.querySelector(".selection").style.left = `${i*15}px`
                break
            }
            i++
        }
    }, 150);
})


function pageTransition(element, url){
    element.classList.add("change")
    setTimeout(() => {
        location.href = url
    }, 1000);
}