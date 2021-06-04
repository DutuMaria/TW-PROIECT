window.onload =function(){
    var range=document.getElementById("inp-rating");
	range.parentNode.insertBefore(document.createTextNode(range.min),range);
	range.parentNode.appendChild(document.createTextNode(range.max));
    let spval=document.createElement("span");
	range.parentNode.appendChild(spval)
    range.value=0;
    spval.innerHTML=" ("+range.value+")";
    range.onchange=function(){
        range.nextSibling.nextSibling.innerHTML=" ("+this.value+")";
    }

    let btn=document.getElementById("filtrare");
    btn.onclick= function(){
        let inp=document.getElementById("nume_produs");
        let nume = inp.value

        
        inp=document.getElementById("inp-rating");
        let minRating=inp.value;
    

        let sel=document.getElementById("inp-stoc");
        let selectStoc=sel.value;


        // preluarea datelor din checkboxurile bifate ==> branduri
        var lista_checkboxes =[];
        var checkboxes=document.getElementsByName("gr_chck");		
		for(let ch of checkboxes){
			if(ch.checked)
				lista_checkboxes.push(ch.value);
		}


		// preluarea datelor din radiobutton-urile bifate ==> gen
        var val_radiobuttons;
		var radiobuttons=document.getElementsByName("gr_rad");		
		for(let rad of radiobuttons){
			if(rad.checked){
				val_radiobuttons = rad.value;
				break;//iesim din for deaorece doar un radiobutton din grup poate fi bifat (si tocmai l-am gasit)
			}
		}

		

        //preluarea optiunilor multiple ==> preturi
        var lista_optiuni_multiple=[];
		var optiuni_multiple=document.getElementById("i_sel_multiplu").options;		
		for(let opt of optiuni_multiple){
			if(opt.selected)
                lista_optiuni_multiple.push(opt.value)
		}


        var produse=document.getElementsByClassName("produs");

        //numele are litere, cifre, spatii si "-"
        // if(!nume.match("^[A-Za-z0-9∼- ]+$")){
        //     alert("Numele a fost introdus greșit!");
        // }
        // else{
            for (let prod of produse){
                prod.style.display="none";
            
                let nume_prod= prod.getElementsByClassName("val-nume")[0].innerHTML;
                let conditie1= nume_prod==nume;

                let rating_prod= parseInt(prod.getElementsByClassName("rating")[0].innerHTML)
                let conditie2= rating_prod>=minRating;

                let stoc_prod= prod.getElementsByClassName("val-in_stoc")[0].innerHTML;
                let conditie3= (stoc_prod==selectStoc || selectStoc=="toate");

                let brand_prod= prod.getElementsByClassName("val-brand")[0].innerHTML;
                let conditie4=  lista_checkboxes.includes(brand_prod); 

                let gen_prod= prod.getElementsByClassName("val-gen")[0].innerHTML;
                let conditie5=  val_radiobuttons==gen_prod || val_radiobuttons=="ambele"; 

                let pret_prod = parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
                let conditie6 = false;
                for (let val of lista_optiuni_multiple){
                    let inedex_caracter_despartitor = val.indexOf("-");
                    if(parseInt(val.slice(0, inedex_caracter_despartitor)) <= pret_prod && pret_prod <= parseInt(val.slice(inedex_caracter_despartitor+1))){
                        conditie6 = true;
                        break;
                    }
                }

            
                if (nume){
                    if (conditie1){
                        prod.style.display="block";
                    }
                }
                else{
                    if (conditie2 && conditie3 && conditie4 && conditie5 && conditie6)
                        prod.style.display="block";
                }
            }
        // }
    }


    function sortArticole(factor){
        
        var produse=document.getElementsByClassName("produs");
        let arrayProduse=Array.from(produse);
        arrayProduse.sort(function(art1,art2){
            let pret1=parseInt(art1.getElementsByClassName("val-pret")[0].innerHTML);
            let pret2=parseInt(art2.getElementsByClassName("val-pret")[0].innerHTML);
            let id1=parseInt(art1.getElementsByClassName("val-id")[0].innerHTML);
            let id2=parseInt(art2.getElementsByClassName("val-id")[0].innerHTML);
            
            let rez1=factor*(pret1-pret2);
            let rez2 =factor*(id1-id2);
            return rez1 || rez2;
        });
        console.log(arrayProduse); 
        for (let prod of arrayProduse){
            prod.parentNode.appendChild(prod);
        }
    }

    btn=document.getElementById("sortCrescPret");
    btn.onclick=function(){
        sortArticole(1);
    }
    btn=document.getElementById("sortDescrescPret");
    btn.onclick=function(){
        sortArticole(-1);
    }

    btn=document.getElementById("resetare");
    btn.onclick=function(){
        
        var produse=document.getElementsByClassName("produs");
    
        for (let prod of produse){
            prod.style.display="block";
        }

        document.getElementById("nume_produs").value = "";
        document.getElementById("inp-rating").value = "0";
        range.nextSibling.nextSibling.innerHTML=" (0)";

        var inputs=document.getElementsByTagName("input");
        for (let i in inputs){
            if (inputs[i].type=="checkbox")
                inputs[i].checked=true;
            if (inputs[i].type=="radio" && inputs[i].value == "ambele")
                inputs[i].checked=true;
        }
        
        var options1=document.getElementsByTagName("option");
        for(let i in options1){
            options1[i].selected=true;
        }

        for(let i in options1){
            if(options1[i].value=="toate")
            options1[i].selected=true;
        }

    }



    window.onkeydown=function(e){
        
       
        if (e.key=="c" && e.altKey){
            e.preventDefault();
            var produse=document.getElementsByClassName("produs");
            sumaArt=0;
            for (let prod of produse){
                sumaArt+=parseInt(prod.getElementsByClassName("val-pret")[0].innerHTML);
            }
            let infoSuma=document.createElement("p");//<p></p>
            infoSuma.innerHTML="Suma: "+sumaArt;//<p>...</p>
            infoSuma.className="info-produse";
            let p=document.getElementById("p-suma")
            p.parentNode.insertBefore(infoSuma,p.nextSibling);
            setTimeout(function(){infoSuma.remove()}, 2000);
        }
    }
}