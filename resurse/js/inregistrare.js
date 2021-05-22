window.addEventListener("load", function(){
    document.getElementById("form_intreg").onsubmit=function(){
        // seteaza intai id urile parl  si rparl in inregistare.esj!!!!!!!!altfel nu cred ca o sa mearga
        if(document.getElementById("parl").value!=document.getElementById("rparl").value){
            alert("Nu ai introdus bine parola!");
            return false;
        }
        return true;
    }
});