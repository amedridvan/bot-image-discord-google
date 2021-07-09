var cheerio=require('cheerio');
var request =require('request');
var discord =require('discord.js');
var cil=new discord.Client();
cil.login("ODYyMjk0NDA2MzU0Njk4MjUx.YOWQPw.f3p9WyCMA6Wcef4MoJt_iLOilP8");
cil.on("ready",function(){
console.log("is ready");
})
cil.on("message",function(message){
  var parts=message.content.split(" ")
    if(parts[0]==="!image"){
        console.log(parts);
        image(message,parts);
    }
});
function image(message,parts){
    var serach=parts.slice(1).join(" ");
    console.log(serach);
    var options= {
        url:"https://results.dogpile.com/?qc=images&q=" +serach ,
        method:"GET",
        headers:{
            "Accept":"text/html",
            "User-Agent":"Chrome"
        }
    };
    request(options,function(error ,response ,responseBody){
        if(error) return console.log(error);
        $=cheerio.load(responseBody);
        var links= $ (".image a.link");
        var z=parseInt(Math.random()*30);
        console.log(z)
        var urls=new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
         console.log(urls);
         if(!urls.length){return;}
         message.channal.send(urls[Math.floor(Math.random()*urls.length)]);

        });
    }
