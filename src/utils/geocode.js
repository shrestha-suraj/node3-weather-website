const request=require('request')
const geocode=(address,callback)=>{
    const geocodeURL=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hyZXN0aGFzdXJhajYyIiwiYSI6ImNrNnBlbXRiczFsaHkzZHU5YW51ZTQ5azQifQ.FXh0wd51ZyrcbT3DIOTFKQ&limit=1`
    request({url:geocodeURL,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to loaction service',undefined)
        } else if(body.features.length===0){
            callback('Unable to find loaction. Try another search',undefined)
        }else{
            callback(undefined,{
                location:body.features[0].place_name,
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0]
            })
        }
    })
}

module.exports=geocode