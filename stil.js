window.onload = function() {
	
	var dugmeSend = document.querySelector("#forma");
	dugmeSend.addEventListener("submit", SendAnketa);

}

function AjaxZahtev(options, callback) { 
	var req = new XMLHttpRequest();
	req.open(options.metod, options.putanja, true);
	req.addEventListener("load", function() {
		if (req.status < 400) {
			console.log(req);
			callback(req.response);
		}
		else {
			callback(new Error("Request failed: " + req.statusText)); 
		}
	});
	req.addEventListener("error", function() {
		callback(new Error("Network error"));
	});
	req.send(options.sadrzaj);

}



function SendAnketa(e){
	e.preventDefault();


	var pol = document.querySelector("#pol").value;
	var godine = document.querySelector("#godine").value;
	var email = document.querySelector("#email").value;
	var trening = document.querySelector("#trening").value;
	var vezba = document.querySelector("#vezba").value;
	var zemlja = document.querySelector("#zemlja").value;
	var ishrana = document.querySelector("#ishrana").value;
	var telefon = document.querySelector("#telefon").value;

	var options = {}
	options.metod = "post";
	options.putanja  = "novaAnketa";
	var poruka = {"pol":pol, "godine":godine, "email":email, "trening":trening, "vezba":vezba, "zemlja":zemlja, "ishrana":ishrana, "telefon":telefon}
	options.sadrzaj = JSON.stringify(poruka); 
	AjaxZahtev(options, PrikaziOdgovorNaPoruku)
}

	function PrikaziOdgovorNaPoruku(odgovor){
	var odgovor2 = JSON.parse(odgovor);

	var tekst = "<section> <p>" + odgovor2.pol + "</p>";
	tekst += "<p>" + odgovor2.godine + "</p>";  
	tekst += "<p>" + odgovor2.email + "</p>"; 
	tekst += "<p>" + odgovor2.trening + "</p>";  
	tekst += "<p>" + odgovor2.vezba + "</p>";   
	tekst += "<p>" + odgovor2.zemlja + "</p>";  
	tekst += "<p>" + odgovor2.ishrana + "</p>"; 
	tekst += "<p>" + odgovor2.telefon + "</p> </section>"
	document.getElementById("ankete").innerHTML = tekst + document.getElementById("ankete").innerHTML;


}