const request=require('request')

const forecast=(location,latitude,longitude,callback)=>{
    const url=`https://api.darksky.net/forecast/35599c749e9e83408d81c58833267677/${latitude},${longitude}`
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the internet',undefined)
        } else if(body.error){
            callback('Unable to find weather data for given location. Try again.',undefined)
        } else{
            callback(undefined,{
                location,
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability
            })
        }
    })
}

module.exports=forecast