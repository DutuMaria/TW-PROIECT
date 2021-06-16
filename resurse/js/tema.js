// window.addEventListener("DOMContentLoaded", function(){
//     let tema = localStorage.getItem("tema");
//     if (tema == "dark")
//         document.body.classList.add("dark");

//     document.getElementById("schimbare-tema").onclick=function(){
//         document.body.classList.toggle("dark");
//         if (document.body.classList.contains("dark"))
//             localStorage.setItem("tema", "dark");
//         else
//             localStorage.setItem("tema", "light");
//     };
// });

window.addEventListener("DOMContentLoaded", function(){
    let tema = localStorage.getItem("tema");
    if (tema == "dark")
        document.body.classList.add("dark");

    document.getElementById("checkbox").onclick=function(){
        document.body.classList.toggle("dark");
        if (document.body.classList.contains("dark"))
            localStorage.setItem("tema", "dark");
        else
            localStorage.setItem("tema", "light");
    };
});

