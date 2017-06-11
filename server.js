var http = require("http");
var fs = require("fs");
var sve_ankete=[]

// Kesiranje statickih fajlova 
var pocetna = fs.readFileSync("index.html","utf8");
var stilcss = fs.readFileSync("stil.css","utf8");
var stiljs = fs.readFileSync("stil.js","utf8");
var ikona = fs.readFileSync("favicon.ico");
var pozadina = fs.readFileSync("background.jpg");

function prikaziPocetnuStranu(response){
  response.writeHead(200, {"Content-Type": "text/html"}); 
  fs.readFile("ankete.txt", "utf8", function(error, text) {
       if (error)
          return;
        sve_ankete = JSON.parse(text);
        var ankete =""
        for(i=sve_ankete.length-1;i>=0;i--){ 
          pol = sve_ankete[i].pol
          godine = sve_ankete[i].godine
          email = sve_ankete[i].email
          trening = sve_ankete[i].trening
          vezba = sve_ankete[i].vezba
          zemlja = sve_ankete[i].zemlja
          ishrana = sve_ankete[i].ishrana
          telefon = sve_ankete[i].telefon         
          ankete += "<section> <p>" + pol + "</p>"
          ankete += "<p>" + godine + "</p>";  
          ankete += "<p>" + email + "</p>"; 
          ankete += "<p>" + trening + "</p>";
          ankete += "<p>" + vezba + "</p>";
          ankete += "<p>" + zemlja + "</p>";  
          ankete += "<p>" + ishrana + "</p>"; 
          ankete += "<p>" + telefon + "</p> </section>"          
        }
        pocetna = pocetna.replace("#ankete#", ankete)
  });
  response.end(pocetna);
} 

function nepoznatURL(response){
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<h1>Not Found</h1>");
  response.end();
}

function UpisNaDisk(ankete){
  fs.writeFile("ankete.txt", ankete, function(err) {
        if (err)
          console.log("Failed to write file:", err);
        else
          console.log("File written.");
});
}

function OdgovorNaZahtev(request,response){


  switch(request.url) {
    case "/": 
    case "/index.html": 
              prikaziPocetnuStranu(response);
              break;
    case "/stil.css":
              response.writeHead(200, {"Content-Type": "text/css"});
              response.end(stilcss);
              break;
    case "/background.jpg":
              response.writeHead(200, {'Content-Type': 'image/jpg' });
              response.end(pozadina, 'binary');
              break;
    case "/favicon.ico":
              response.writeHead(200, {'Content-Type': 'image/gif' });
        			response.end(ikona, 'binary');
              break;
    case "/stil.js":
						  response.writeHead(200, {"Content-Type": "text/plain"});
	            response.end(stiljs);
	            break;
    case "/novaAnketa":

              request.setEncoding('utf8');
              request.on('data', function (nova_anketa) {
                
                sve_ankete.push(JSON.parse(nova_anketa));
                UpisNaDisk(JSON.stringify(sve_ankete));
                console.log(sve_ankete);
                response.end(nova_anketa);
              });
              break;
      default: 
	            nepoznatURL(response);
	            break;
	}
}

var server = http.createServer(OdgovorNaZahtev);
server.listen(8000);
console.log("Server ceka zahteve na portu 8000"); 