const chalk=require('chalk')
const express=require('express')
const path=require('path')
const app=express()
const hbs=require('hbs')
const assetDirectory=path.join(__dirname,'../public')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Port number set by herkou
const port=process.env.PORT || 3000
//This allows express to render page depending on the html page name 
// on the browser url.. Doesnot need any routing for the html pages

// Define paths for expres config
const templatePath=path.join(__dirname,'..','templates','views')
// console.log(templatePath)
//Setup handlebars engine and views location
app.set('view engine','hbs')
//for accessing html from a specific folder
app.set('views',templatePath)

//Even though i deleated the public html files. I still need it to load js files and css file
app.use(express.static(assetDirectory))

//This things are being done for the headers and footers
const pratialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(pratialsPath)



app.get('/',(request,response)=>{
    response.render('index',{
        title:'Weather App',
        name:'Suraj Shrestha'
    }) //From handlebar. Folder: view
})

app.get("/about",(request,response)=>{
    response.render('about',{
        title:'About Me',
        name:'Suraj Shrestha'
    })
})

app.get('/help',(request,response)=>{
    response.render('help',{
        title:'Help',
        name:'Suraj Shrestha',
        message:'This is a message for the help section'
    })
})

//Example for loading json data
app.get('/weather',(request,response)=>{
    if(!request.query.address){
        return response.send({
            error:'Please provide an address'
        })
    }else {
        let location=request.query.address
        geocode(location, (error, geoData) => {
            if (error) {
                console.log(chalk`{red.bold Error, ${error}}`)
                return response.send({
                    error:error
                })
            } else {
                const {location,latitude,longitude}=geoData
                forecast(location,latitude, longitude, (error, {location,temperature, precipProbability}) => {
                    if (error) {
                        console.log(chalk`{red.bold Error, ${error}}`)
                        return response.send({
                            error:error
                        })
                    } else {
                        response.send({
                            location,
                            temperature,
                            precipProbability
                        })
                    }
                })
            }
    
        })
    }
})

//Example to query json data and send it
//We cannot send two responses to html
app.get('/products',(request,response)=>{
    //Getting data query from the header
    if(!request.query.search){
        return response.send({
            error:'You musth provide a search term'
        })
    }
    console.log(request.query.search)
    response.send({
        products:[]
    })
})


//Matching a bunch of request for help/something that doesnot exits
app.get('/help/*',(request,response)=>{
    response.render('404page',{
        message:'Help Article Not Found',
        name:'Suraj Shrestha',
        title:'404'
    })
})
//Route handlerer for route that is not supported by our nodejs
//* means anything that is not included in our get routers
//* means wild card character
app.get('*',(request,response)=>{
    response.render('404page',{
        message:'My 404 Page',
        name:'Suraj Shrestha',
        title:'404'
    })
})


//Change this for horku.. change port number
app.listen(port,(error)=>{
    if(!error){
        console.log('Server is up on port'+port)
    }else{
        console.log(chalk.red.bold.inverse('If ran into error with server. Run pkill nodejs or pkill node'))
    }

})