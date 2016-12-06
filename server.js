var http = require("http");
var express = require("express"); 
var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer();
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var noticias = [
  {id: "1", title: "Caso Próvolo: Esperamos que este sea el último coletazo de una práctica que hizo mucho daño a la Iglesia", lead: "El Arzobispado de Mendoza empezará a pedir formalmente los antecedentes de los sacerdotes que vengan de otras provincias o países para desempeñarse en la curia mendocina.", body:"Esto es una de las reacciones que mostraron desde esa institución luego de la lluvia de críticas que recibieron por despegarse de cualquier responsabilidad ante los casos de abuso sexual que acontecieron en el instituto Antonio Próvolo de Luján.Además, habrá una reunión entre todos los decanos (sacerdotes responsables departamentales), para acordar qué mensaje será dado a los fieles que el domingo próximo vayan a misa, ante lo que consideran un enorme daño a la comunidad católica, por lo horrible de la situación ventilada.Así lo explicó el vocero del Arzobispado, Marcelo De Benedectis, al finalizar el juramento del nuevo ministro de la Suprema Corte, José Valerio.El sacerdote insistió en el desconocimiento de las acusaciones con las que llegó el cura Nicola Corradi desde Verona, Italia, al decir que con total honestidad digo que en la curia no había ninguna información ni conocimiento de esto, ni dato, ni papel, ni rumor, nada.En ese contexto detalló que cuando Corradi fue presentado en el año 1996 al arzobispo José María Arancibia, traía una carta del superior general de la congregación de la Compañía de María como un hombre capaz de llevar adelante la obra que se estaba abriendo en Mendoza"},
  {id: "2" ,title: "Causa Nisman: denunciaron a Sergio Berni y a la ex fiscal Viviana Fein",lead:"EEl fiscal federal Eduardo Taiano denunció al exsecretario de Seguridad Sergio Berni y a la exfiscal Viviana Fein así como a miembros de las fuerzas de seguridad por irregularidades cometidas el 18 de enero de 2015 en la escena donde Alberto Nisman apareció sin vida.",body:"El flamante integrante de la Corte dijo que no podía opinar sobre la actitud de la fiscal porque debía integrar el Jury si este prosperaba. Indicó que dentro del Poder Judicial es necesario transparentar todos los procesos, darle acceso a los mendocinos para terminar con este tipo de problemas.A su turno, el gobernador explicó una vez más que preferiría que el Jury prosperara para que Orozco sea sancionada, pero indicó que, de no ser así, no habrá más remedio que aceptar su renuncia, en un claro mensaje para que en esta oportunidad exista una sanción para un funcionario de la Justicia, tal cual viene reclamando desde hace tiempo, sobre todo cuando pidió el mismo proceso para otro fiscal, Fabricio Sidoti.En ese mismo sentido, durante su extenso discurso, comparó esta necesidad de dar el ejemplo por parte de quién tienen responsabilidades dentro de la función pública, con lo sucedido con los docentes y el ítem aula."},
  {id: "3",title: "Explicaron que la fiscal viajera tiene tres o cuatro pedidos de licencias engañosas anteriores",lead:"El escándalo por la fiscal viajera Anabel Orozco no quedó soslayado en el acto donde la Suprema Corte de Mendoza quedó completa con el juramento de José Valerio.",body:"El flamante integrante de la Corte dijo que no podía opinar sobre la actitud de la fiscal porque debía integrar el Jury si este prosperaba. Indicó que dentro del Poder Judicial es necesario transparentar todos los procesos, darle acceso a los mendocinos para terminar con este tipo de problemas.A su turno, el gobernador explicó una vez más que preferiría que el Jury prosperara para que Orozco sea sancionada, pero indicó que, de no ser así, no habrá más remedio que aceptar su renuncia, en un claro mensaje para que en esta oportunidad exista una sanción para un funcionario de la Justicia, tal cual viene reclamando desde hace tiempo, sobre todo cuando pidió el mismo proceso para otro fiscal, Fabricio Sidoti.En ese mismo sentido, durante su extenso discurso, comparó esta necesidad de dar el ejemplo por parte de quién tienen responsabilidades dentro de la función pública, con lo sucedido con los docentes y el ítem aula.Resulta difícil exigirle a un docente que cumpla con su tarea, que no fragüen certificados médicos, si una fiscal se va a Brasil con su certificado trucho y además, cuando ya ha tenido conductas anteriores similares y no ha tenido sanción alguna; no es buena señal, indicó Cornejo."}
];

app.get('/',function(req,res){
	res.redirect(302, "/posts"); 
})
app.get('/posts', function (req, res) {
  	res.json(noticias);
});

app.get('/posts/new', function (req, res) {
	var noticia = noticias[noticias.length-1]
  	res.json(noticia);
});


app.get('/posts/:id',function(req,res){
	if(req.params.id >= noticias.length+1|| req.params.id <= 0) {
    	res.statusCode = 404;
    	return res.send('Noticia no encontrada');
  	}  
	var noticia = noticias[req.params.id-1];
  	res.json(noticia);
});

app.post('/posts/:id',upload.array(),function(req, res, next) {
	if(req.body.title == ""){
		return res.send("Debe ingresar un titulo");
	}
	if(req.body.lead == ""){
		return res.send("Debe ingresar un resumen");
	}
	if(req.body.body == ""){
		return res.send("Debe ingresar un cuerpo");
	}
	var newNoticia = {
    	id : req.params.id,
    	title : req.body.title,
    	lead : req.body.lead,
    	body : req.body.body
  	}; 
 
	noticias.push(newNoticia);
  	res.json("Noticia cargada!");
});

app.delete('/posts/:id', function (req, res) {
  if(req.params.id >= noticias.length+1|| req.params.id <= 0) {
    	res.statusCode = 404;
    	return res.send('Error 404: Noticia no encontrada');
  	}  
	var noticia = noticias[req.params.id-1];
  	noticias.pop(noticia);
  	res.json("Noticia eliminada!")
});


app.listen(process.env.PORT || 3000);


