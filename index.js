//cu require includem pachetele folosite in proiect
const express = require('express');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const {Client} =require('pg');  // require returneaza un obiect
const url = require('url');
const { exec } = require("child_process");
const ejs=require('ejs');
const { response } = require('express');
const session = require('express-session'); //creare de sesiuni
const formidable = require('formidable'); // pt parsarea datelor dintr- un formular, in special pt poza
const crypto = require('crypto'); // pt criptarea parolei
const nodemailer = require('nodemailer'); // trimitere email utilizator

var app=express();//am creat serverul



//setez o sesiune
app.use(session({
    secret: 'abcdef', //folosit de express pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
}));

async function trimiteMail(username, email){
    var transp = nodemailer.createTransport({  //functia createTransport creeaza un obiect cu datele de autentificare
        service: "gmail",
        secure: false,
        auth:{// date login
            user:"shuttle.life.2021@gmail.com",
            pass:"ShuttleLife2021"
        }, 
        tls:{
            rejectUnauthorised: false
        }

    });
    //genereaza html
    await transp.sendMail({
        from: "shuttle.life.2021@gmail.com",
        to: email,
        subject: "Te-ai autentificat cu succes!", 
        text:"Username-ul tău este "+username,
        html: "<h1>Salut!</h1><p>Username-ul tău este: "+username+" </p>",
    });
    console.log("mail trimis");
}


//setam datele clentului PostgreSQL
//trebuie sa inlocuiti cu username-ul vostru si parola voastra pentru userul creat special pentru acest proiect
const client = new Client({
    host: 'localhost',
    user: 'maria',
    password: 'maria',
    database: 'proiect_tw',
    port:5432
})
client.connect()

app.set("view engine", "ejs");
console.log("Proiectul se va afla la ", __dirname);


app.get("*/galerie.json",function(req, res){
    res.status(403).render("pagini/403");
});

app.use("/resurse", express.static(__dirname + "/resurse"));


function verificaImagini(){
	var textFisier=fs.readFileSync("resurse/json/galerie.json") //citeste tot fisierul
	var jsi=JSON.parse(textFisier); //am transformat in obiect

	var caleGalerie=jsi.cale_galerie;
    let vectImagini=[]
	for (let im of jsi.imagini){
		var imMare= path.join(caleGalerie, im.cale_fisier);//obtin claea completa (im.fisier are doar numele fisierului din folderul caleGalerie)
		var ext = path.extname(im.cale_fisier);//obtin extensia
		var numeFisier =path.basename(im.cale_fisier,ext)//obtin numele fara extensie
		let imMica=path.join(caleGalerie+"/mic/", numeFisier+"-mic"+".webp");//creez cale apentru imaginea noua; prin extensia wbp stabilesc si tipul ei
		//console.log(imMica);
        let imMediu=path.join(caleGalerie+"/mediu/", numeFisier+"-mediu"+".jpg");
        vectImagini.push({mare:imMare, mic:imMica, mediu:imMediu,  descriere:im.text_descriere, alt:im.alt, luni:im.luni}); //adauga in vector un element
		if (!fs.existsSync(imMica))//daca nu exista imaginea, mai jos o voi crea
		sharp(imMare)
		  .resize(150) //daca dau doar width(primul param) atunci height-ul e proportional
		  .toFile(imMica, function(err) {
              if(err)
			    console.log("eroare conversie",imMare, "->", imMica, err);
		  });
          if (!fs.existsSync(imMediu))//daca nu exista imaginea, mai jos o voi crea
		sharp(imMare)
		  .resize(300) //daca dau doar width(primul param) atunci height-ul e proportional
		  .toFile(imMediu, function(err) {
              if(err)
			    console.log("eroare conversie",imMare, "->", imMediu, err);
		  });
	}
    // [ {mare:cale_img_mare, mic:cale_img_mica, descriere:text}, {mare:cale_img_mare, mic:cale_img_mica, descriere:text}, {mare:cale_img_mare, mic:cale_img_mica, descriere:text}  ]
    return vectImagini;
}

// decembrie 11, ianuare 0, feb 1;
function verificaLuna(imagine){
    // nu e terminata
    var data = new Date();
    if (data.getMonth() == 0){
        let luna = "ianuare";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 1){
        let luna = "februare";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 2){
        let luna = "martie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 3){
        let luna = "aprilie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 4){
        let luna = "mai";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 5){
        let luna = "iunie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 6){
        let luna = "iulie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 7){ 
        let luna = "august";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 8){
        let luna = "septembrie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 9){
        let luna = "octombrie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 10){
        let luna = "noiembrie";
        return imagine.luni.includes(luna); 
    }
    if (data.getMonth() == 11){
        let luna = "decembrie";
        return imagine.luni.includes(luna); 
    }
}

// pt statica
var img = verificaImagini();
var imgStatica = img.filter(verificaLuna);

//numarul de img trebuie sa fie divizibil cu 3 pentru a respecta afisarea din grid
function divizibil_cu_3(){
    var img = verificaImagini();
    var imgStatica = img.filter(verificaLuna);
    if(imgStatica.length % 3 == 0)
        return imgStatica
    return imgStatica.slice(0, imgStatica.length - imgStatica.length % 3)
    
}

//pt animata
var nrImag=[3, 6, 9, 12, 15] // nr divizibile cu 3 mai mici decat 16
var nrImagAleator = nrImag[Math.floor(Math.random()*nrImag.length)];
var offset = Math.floor(Math.random()*3)
var imgAnimata = verificaImagini().slice(offset, nrImagAleator + offset)

app.get(["/","/index"],function(req, res){//ca sa pot accesa pagina principala si cu localhost:8080 si cu localhost:8080/index
    //res.render("pagini/index", {imaginiS: divizibil_cu_3().slice(0, 12), imaginiA: imgAnimata, ip:req.ip}); /* relative intotdeauna la folderul views*/
    res.render("pagini/index", {imaginiS: divizibil_cu_3().slice(0, 12), imaginiA: imgAnimata, ip:req.ip, utilizator: req.session.utilizator});
    console.log("nr imagini pt galerie statica: " + divizibil_cu_3().slice(0, 12).length)
});

app.post("/login", function(req, res){
    let formular = formidable.IncomingForm();
        formular.parse(req, function(err, campuriText){});  // functia se apeleaza cand am primit toate datele din formular 
            // console.log(campuriText);
            let parolaCriptata = crypto.scryptSync(campuriText.parola, parolaServer, 32).toString('ascii');
            let comanda = `select username, email, culoare_chat from utilizatori where username = '${campuriText.username}' and parola = '${parolaCriptata}'`;
            console.log(comanda);
            client.query(comanda, function(err, rez){
                if (!err){
                    if(rez.rows.length == 1){
                        req.session.utilizator={
                            username: campuriText.username, 
                            email: campuriText.email,
                            culoare: campuriText.culoare_chat
                        }
                    }
                   
                }
                res.redirect("/index");
            });
});



app.get(["/galerieStatica"],function(req, res){//ca sa pot accesa pagina principala si cu localhost:8080 si cu localhost:8080/index
    // res.render("pagini/galerieStatica", {imagini: imgStatica.slice(0, 13)}); /* relative intotdeauna la folderul views*/
    res.render("pagini/galerieStatica", {imaginiS: divizibil_cu_3().slice(0, 12)});
});

app.get(["/galerieAnimata"],function(req, res){//ca sa pot accesa pagina principala si cu localhost:8080 si cu localhost:8080/index
    res.render("pagini/galerieAnimata", {imaginiA: imgAnimata}); /* relative intotdeauna la folderul views*/
});

app.get("*/galerie-animata.css",function(req, res){
    /*Atentie modul de rezolvare din acest app.get() este strict pentru a demonstra niste tehnici
    si nu pentru ca ar fi cel mai eficient mod de rezolvare*/
    res.setHeader("Content-Type","text/css");//pregatesc raspunsul de tip css
    let sirScss=fs.readFileSync("./resurse/css/galerie-animata.scss").toString("utf-8");//citesc scss-ul cs string
    // nrImag=[3, 6, 9, 12, 15] // nr divizibile cu 3 mai mici decat 16
    // let nrImagAleator = nrImag[Math.floor(Math.random()*nrImag.length)];
    let rezScss=ejs.render(sirScss,{nrImagini: nrImagAleator});// transmit numarul de imagini catre scss si obtin sirul cu scss-ul compilat
    // console.log(rezScss);
    console.log("nr imag pt gal animata: " + nrImagAleator);
    console.log("offset - animata: " + offset);
    // console.log(imgAnimata);
    fs.writeFileSync("./temp/galerie-animata.scss",rezScss);//scriu scss-ul intr-un fisier temporar
    exec("sass ./temp/galerie-animata.scss ./temp/galerie-animata.css", (error, stdout, stderr) => {//execut comanda sass (asa cum am executa in cmd sau PowerShell)
        if (error) {
            console.log(`error: ${error.message}`);
            res.end();//termin transmisiunea in caz de eroare
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            res.end();
            return;
        }
        console.log(`stdout: ${stdout}`);
        //totul a fost bine, trimit fisierul rezultat din compilarea scss
        res.sendFile(path.join(__dirname,"temp/galerie-animata.css"));
    });

});

var zile = ["Dmunincă", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];
var luni = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Inunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"];




app.get("/produse",function(req, res){
    // console.log("Url:",req.url);
    //console.log("Query:", req.query.tip);
    // conditie_booleana? val_true : val_false
    let conditie= req.query.categorie ?  " and categorie='"+req.query.categorie+"'" : "";//daca am parametrul tip in cale (tip=cofetarie, de exemplu) adaug conditia pentru a selecta doar produsele de acel tip
    // console.log("select id, nume, pret, categorie, marime, gen, rating_score, in_stoc, brand, imagine from echipament where 1=1"+conditie);
    client.query("select id, nume, pret, categorie,  marime, gen, rating_score, in_stoc, brand, imagine from echipament where 1=1"+conditie, function(err,rez){
        // console.log(err, rez);
        // console.log(rez.rows);
        client.query("select unnest(enum_range( null::brand_produse)) as brand", function(err,rezCateg){//selectez toate valorile posibile din enum-ul categ_prajitura

            // console.log(rezCateg);
            client.query("select distinct in_stoc as stoc from echipament", function(err, filtrare_stoc){
                client.query("select distinct gen from echipament", function(err, filtrare_gen){
                    client.query("select distinct brand from echipament", function(err, filtrare_brand){
                        client.query("select distinct pret from echipament", function(err, filtrare_pret){
                            res.render("pagini/produse", {produse:rez.rows, categorii:rezCateg.rows, utilizator: req.session.utilizator, stoc:filtrare_stoc.rows, genuri:filtrare_gen.rows, branduri:filtrare_brand.rows, preturi:filtrare_pret.rows});//obiectul {a:10,b:20} poarta numele locals in ejs  (locals["a"] sau locals.a)
                        });
                    });
                });
            });
        });
    });
});


// pagina proprie produsului
app.get("/produs/:id_produs",function(req, res){
    console.log(req.params);
    
    const rezultat= client.query("select id, nume, pret, categorie, marime, gen, in_stoc, brand, descriere, rating_score, imagine from echipament where id="+req.params.id_produs, function(err,rez){
        // console.log(err, rez);
        // console.log(rez.rows);
        client.query("select data_adaugare from echipament", function(err,rezData){
            let an = rezData.rows[0].data_adaugare.getFullYear();
            let zi_nr = rezData.rows[0].data_adaugare.getDate();
            let zi_cuvant = zile[rezData.rows[0].data_adaugare.getDay()];
            let luna = luni[rezData.rows[0].data_adaugare.getMonth()];
            
        res.render("pagini/produs", {prod:rez.rows[0], utilizator: req.session.utilizator, data: zi_cuvant + ", " + zi_nr + "-" + luna + "-" + an});
        });
    });
});

// TO DO + nu se afiseaza; cand dau cu inspect imi afiseaza o eroare pt tema.js pt onclick
let parolaServer = "tehniciweb";
app.post("/inreg", function(req, res){
    // console.log("primit date");

    let formular = formidable.IncomingForm();
    formular.parse(req, function(err, campuriText, campuriFisier){;  // functia se apeleaza cand am primit toate datele din formular 
        // console.log(campuriText);
        let parolaCriptata = crypto.scryptSync(campuriText.parola, parolaServer, 32).toString('ascii');
        let comanda = `insert into utilizatori (username, nume, prenume, parola, email, culoare_chat) values ('${campuriText.username}', '${campuriText.nume}', '${campuriText.prenume}', '${parolaCriptata }', '${campuriText.email}', '${campuriText.culoare_chat}')`;
        console.log(comanda);
        client.query(comanda, function(err, rez){
             if (err){
                 console.log(err);
                 res.render("/pagini/inregistrare", {err: "Eroare baza de date! Reveniți mai târziu!", raspuns: "Datele NU au fost introduse."});
            }
             else{
                res.render("/pagini/inregistrare", {err: "", raspuns: "Datele au fost introduse."});
                trimiteMail(campuriText.username, campuriText.email);
           }
            res.render("/pagini/inregistrare", {});
          
        });
    });
});

app.get("/logout", function(req, res){
    req.session.destroy();
    res.render("pagini/logout");
});


app.get("/*", function(req, res){
    console.log(req.url);
    res.render("pagini" + req.url, function(err, rezultatRandare){
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404", {utilizator: req.session.utilizator});
            }
            else{
                throw err;
            }
        }
        else{
            res.send(rezultatRandare);
        }
    }, {utilizator: req.session.utilizator});
    console.log("Cerere generala!!!");
    
});



verificaImagini();

app.listen(8080);
console.log("Serverul a pornit!");