const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs")


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
}))

app.use((req, res, next)=>{
   if(req.path.includes("/api/")){
        next();   
   } else if(req.path.includes("/vgbuild-docs")){
      res.set("Content-type", "text/html");
    res.status(200).send(fs.readFileSync("./src/documentation.html"))
   
   }else{
        res.set("Content-type", "text/html");
        res.status(200).send(fs.readFileSync("./src/home.html"))
   }
})

getRoutes('./routes/');

function getRoutes(path) {
        fs.readdirSync(path).forEach(function(file) {
                const stats = fs.lstatSync(`${path}/${file}`);
                if (stats.isDirectory()) {
                        getRoutes(`${path}/${file}`);
                } else {
                        const route = require(`${path}/${file}`);
                        app.use(route.route, route.app);
                }
        });
}

app.listen(3000,
        () => {
                console.log(`Servidor funfando.`);
        });