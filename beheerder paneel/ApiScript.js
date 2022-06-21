const { CardStyleInterpolators } = require("@react-navigation/stack");

const apibasis = "http://localhost:8000/api/"; 
const apipresentatie = apibasis+"presentaties"
const apioefeningen = apibasis+"oefeningen";
const apiusers = apibasis+"users";
//_____________________________________________________________________________ API TOKEN, ARRAY, AND ROLE GLOBAL SAVE __________________________________________________________________________________________________________

let global = []; // global array for all the tables

let access_token = ""; // variable to save the token
let role ="";
//______________________________________________________________________________ EVERYTHING TO DEFINE THE CORRECT TABLE _______________________________________________________________________________________________________
let defineLoad = "oefeningen"; // variable that defines wich table to load.
var TableHeader ="<th>naam</th><th>beschrijving-NL</th><th>beschrijving-ENG</th><th>foto</th><th>delete</th>";
//___________________________________________________________________ SAVE THE ID AND GLOBAL ARRAY TO USE IT IN THE WHOLE SYSTEM________________________________________________________________________________________________________

let jsonUpdate={}; // global update array fo 2 tables 
let IdUpdate =""; // global let to save the id for updates
//____________________________________________________________________________________________ LOGIN SECTION _________________________________________________________________________________________________________



const login = async () =>{ // login function 
   
    const password = document.querySelector("#password").value; // get value password 
    const email    = document.querySelector("#email").value; // get value email
     if(password == "" || email ==""){ // check if inputs are not empty
         alert("vergeet niet alle tekst velden in te vullen");
    }

     if(password != "" || email !=""){ // if inputs are not empty 
        try{
            const jsonstring = {"password":password, "email":email}; // adds value to json string 
            console.log("login: ", jsonstring); 
            const respons = await axios.post("http://localhost:8000/api/login", jsonstring, {headers: {'Content-Type': 'application/json'}}); // api post 
            console.log('status code', respons.status);
            access_token = respons.data.access_token; 
            console.log('access_token: ', access_token,);
            role = respons.data.userData[0].role;
            const json = await respons.data
            access_token = json.access_token
            showtable();
        }
        catch{
            
        }
    }
    if (role == "admin"){
        $("#login").fadeOut('slow', function(){
            $("#table").fadeIn('fast');
            $("#BtnChoice").fadeIn('fast').css("display", "flex");
            });
            GetData();
            HeaderChanger();
    }
    else if (role != "admin"){
        alert("je hebt geen rechten om in te loggen");
    }
}
//__________________________________________________________________________________ TH CHANGER FOR TABLE TABELINHOUD _____________________________________________________________________________________________________

// sets the value of the th in the table 
const HeaderChanger =() =>{
    document.querySelector("#tableheader").innerHTML = TableHeader
}
//____________________________________________________________________________________________ GET DATA SECTION _______________________________________________________________________________________________________
// get al the data that is been chosen from the 3 buttons below the table.

const GetData = async ()  =>{
    console.log("Get cars")
    console.log(access_token
        )
    const response = await axios.get("http://localhost:8000/api/"+defineLoad, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer '+ access_token
        }
    })
    const json = await response.data
        access_token = json.access_token
        global =json.data
        console.log(global)
        loadData();
} 
//_______________________________________________________________________________________ LOAD DATA IN TO TABLE SECTION________________________________________________________________________________________________
// loads al the data that is been get by the get data functin in to the table
const loadData = () => {
    let tabelInhoud = ''
    if(defineLoad == "oefeningen"){
        global.map((el, key) => tabelInhoud += `<tr><td onclick="bewerken('${key}')">${el.naam}</td><td onclick="bewerken('${key}')">${el.beschrijvingNL}</td><td onclick="bewerken('${key}')">${el.beschrijvingENG}</td>
        <td onclick="bewerken('${key}')">${el.foto}</td><td onclick="verwijder(${el.id})"><p class="deletebtn">Delete</p> </td></tr>`) 
        document.querySelector("#tabelInhoud").innerHTML = tabelInhoud
    }
    else if (defineLoad=="users"){
        global.map((el, key) => tabelInhoud += `<tr><td onclick="bewerken('${key}')">${el.name}</td><td onclick="bewerken('${key}')">${el.email}</td><td onclick="bewerken('${key}')">${el.password}</td>
        <td onclick="bewerken('${key}')">${el.role}</td><td onclick="verwijder(${el.id})"><p class="deletebtn">Delete</p> </td></tr>`) 
        document.querySelector("#tabelInhoud").innerHTML = tabelInhoud
    }
    else{
        global.map((el, key) => tabelInhoud += `<tr><td onclick="bewerken('${key}')">${el.datum}</td><td onclick="bewerken('${key}')">${el.starttijd}</td><td onclick="bewerken('${key}')">${el.eindtijd}</td>
        <td onclick="bewerken('${key}')">${el.oefeningid}</td> <td onclick="bewerken('${key}')">${el.userid}</td> <td onclick="bewerken('${key}')">${el.aantal}</td><td onclick="verwijder(${el.id})"><p class="deletebtn">Delete</p> </td></tr>`) 
        document.querySelector("#tabelInhoud").innerHTML = tabelInhoud
    }
}
//_____________________________________________________________________________________  CHANGE VALUE BUTTON SECTION ___________________________________________________________________________________________________
// three button to change the value of the table 
const btnoefeningen =()=>{ 
    defineLoad = "oefeningen";
    TableHeader ="<th>naam</th><th>beschrijving-NL</th><th>beschrijving-ENG</th><th>foto</th><th>delete</th>"
    HeaderChanger();
    GetData();
}
const btngebruikers =()=>{
    TableHeader ="<th>name</th><th>email</th><th>password</th><th>role</th><th>delete</th>"
    defineLoad = "users";
    HeaderChanger();
    GetData();
}
const btnprestaties =()=>{
    defineLoad = "prestaties";
    TableHeader ="<th>datum</th><th>starttijd</th><th>eindtijd</th><th>oefeningid </th><th>userid</th><th>aantal</th>"
    HeaderChanger();
    GetData();
}
//_____________________________________________________________________________________________ UPDATE SECTION ____________________________________________________________________________________________________
// function to open the right screen, choice betweeen updateoefeningen, updategebruikers
const bewerken =(keys)=>{
    
    if(defineLoad == "oefeningen"){
        $("#table").fadeOut('slow', function(){
            $("#BtnChoice").fadeOut('slow'); 
            $("#UpdateOefeningen").fadeIn('fast').css("display", "flex");
            });
            document.getElementById("naam").value = global[keys].naam; 
            document.getElementById("beschrijvingNL").value = global[keys].beschrijvingNL;
            document.getElementById("beschrijvingENG").value = global[keys].beschrijvingENG;
            document.getElementById("foto").value = global[keys].foto;   
            IdUpdate = global[keys].id;
    }
    else if (defineLoad=="users"){
        document.querySelector("#nameUser").value = global[keys].name;
        document.querySelector("#emailUser").value  = global[keys].email;
        $("#table").fadeOut('slow', function(){
            $("#BtnChoice").fadeOut('slow');
            $("#UpdateGebruikers").fadeIn('fast').css("display", "flex");
            });
            IdUpdate = global[keys].id;
            console.log(IdUpdate);
    } 
}
// function to update a row of the database
const updateData = async( )=>{

    let jsonstring= null; 
    let checkgood = null; // checks if data is collected by the api
    if(defineLoad == "oefeningen"){
        // get al input values 
        const naam     = document.querySelector("#naam").value
		const beschrijvingNL = document.querySelector("#beschrijvingNL").value 
		const beschrijvingENG    = document.querySelector("#beschrijvingENG").value
		const foto  = document.querySelector("#foto").value
        jsonstring= {"naam":naam, "beschrijvingNL":beschrijvingNL, "beschrijvingENG":beschrijvingENG, "foto":foto};
        console.log(jsonstring);
    }
    else if (defineLoad=="users"){
        const name     = document.querySelector("#nameUser").value
		const email = document.querySelector("#emailUser").value 
		const password    = document.querySelector("#passwordUser").value
        const role =  document.querySelector("#roleSelect").value
        const password_confirmation =  document.querySelector("#passwordUserconf").value
        jsonstring= {"name":name, email:email, "password":password,"role":role,"password_confirmation":password_confirmation};
       if(password == ""){
        jsonstring= {"name":name, email:email,"role":role};

       }
        console.log(email,password);
        console.log(jsonstring);
    } 
    const respons = await axios.patch("http://localhost:8000/api/"+defineLoad+"/"+IdUpdate,jsonstring, {
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization':'Bearer '+ access_token
				}
			})
            const json = await respons.data
            access_token = json.access_token
            checkgood = await respons.data;
            if (checkgood != null){ // if data is received then show the table 

                $("#table").fadeIn('slow', function(){
                    $("#UpdateOefeningen").fadeOut('fast').css("display", "none");
                    $("#BtnChoice").fadeIn('fast').css("display", "flex");
                    });
            }
    console.log('status code', respons.status);
    await GetData();
}
//________________________________________________________________________________________________CREATE SECTION______________________________________________________________________________________________________
const btnCreate = ()=>{
     if(defineLoad == "users") {
        $("#login").fadeOut('slow', function(){
            $("#table").fadeOut('fast')
            $("#BtnChoice").fadeOut('fast')
            $("#register").fadeIn('fast').css("display", "flex");
            });
     }
     else{
        $("#login").fadeOut('slow', function(){
            $("#table").fadeOut('fast')
            $("#BtnChoice").fadeOut('fast')
            $("#MaakOefeningen").fadeIn('fast').css("display", "flex");
            });
     }
}
const RegisterUser = async ()=>{
    const name     = document.querySelector("#namereg").value
	const email = document.querySelector("#emailreg").value 
	const password    = document.querySelector("#passwordreg").value
	const password_confirmation    = document.querySelector("#passwordfirm").value
    const role =  document.querySelector("#roleSelectreg").value
    const jsonregister ={"name":name,"email":email,"password":password,"password_confirmation":password_confirmation,"role":role};
    console.log(jsonregister);

    try{
        if (password == password_confirmation){
            const respons = await axios.post("http://localhost:8000/api/register", jsonregister, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'Bearer '+ access_token
            }
        })
        const json = await respons.data
        access_token = json.access_token
        console.log('status code', respons.status)
        await GetData();
        $("#register").fadeOut('slow', function(){
            $("#table").fadeIn('fast').css("display", "flex");
            $("#BtnChoice").fadeIn('fast').css("display", "flex");
            });
        }
        else if (password != password_confirmation){
            alert("de wachtwoorden komen niet overeen met elkaar");
        }
    }
    catch{
        alert("U heeft niet alles ingvuld, kijk eens nog eens of alles klopt");
    }
}
const createoefening = async ()=>{
    try{
        const naam     = document.querySelector("#naamcre").value
		const beschrijvingNL = document.querySelector("#beschrijvingNLcre").value 
		const beschrijvingENG    = document.querySelector("#beschrijvingENGcre").value
		const foto  = document.querySelector("#fotocre").value
        let jsonstringcre ="";
        jsonstringcre= {"naam":naam, "beschrijvingNL":beschrijvingNL, "beschrijvingENG":beschrijvingENG, "foto":foto};
        console.log(jsonstringcre);
        if(naam != null && beschrijvingNL != null && beschrijvingENG != null){
            const respons = await axios.post("http://localhost:8000/api/oefeningen", jsonstringcre, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization':'Bearer '+ access_token
            }
        })
        const json = await respons.data
        access_token = json.access_token
        console.log('status code', respons.status)
        await GetData();
        $("#MaakOefeningen").fadeOut('slow', function(){
            $("#table").fadeIn('fast').css("display", "flex");
            $("#BtnChoice").fadeIn('fast').css("display", "flex");
            });
        }
        else{
            alert("je hebt niet alles goed in gevuld");
        }
    }
    catch{
        alert("er is iets mis gegaan kijk nog eens of je mischien iets vergeten bent.");
    }     
}
//___________________________________________________________________________________________ DELETE SECTION _____________________________________________________________________________________________________
const verwijder = async (id)=>{
try{
    const respons = await axios.delete("http://localhost:8000/api/"+defineLoad+"/"+id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization':'Bearer '+ access_token
        }
    })
    const json = await respons.data
    access_token = json.access_token
    console.log('status code', respons.status)
    await GetData();
}
catch{
    alert("er is iets mis gegaan met het verwijderen van de gekozen item");
}
    
}   

