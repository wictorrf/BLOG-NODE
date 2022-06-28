const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const connection = require("./database/database")

const categoriesController = require("./categories/categoriesController")
const articlesController = require("./articles/articlesController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")



//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: true,parameterLimit:100000,limit:"500mb"}));
app.use(bodyParser.json());

//database
connection.authenticate().then(() => {
	console.log("Conexao com banco de dados deu certo!");
}).catch((error) => {
	console.log(error);
})


app.use("/", categoriesController);
app.use("/", articlesController)

app.get("/", (req, res) => {
	Article.findAll().then(articles => {
		res.render("index", {articles: articles})
	})
})

app.get("/:slug", (req, res) => {
	var slug = req.params.slug;
	Article.findOne({
		where: {
			slug: slug
		}
	}).then(article => {
		if(article != undefined){
			res.render("article", {article: article});
		}else {
			res.redirect("/")
		}
	}).catch(err => {
		console.log(err)
	})
})

app.listen(8080, () => {
	console.log("o servidor esta rodando!!!")
})