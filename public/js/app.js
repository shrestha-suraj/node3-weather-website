const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const weatherForm=document.querySelector('form')
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault()
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    const address=document.querySelector('input').value.split(" ")
    // const location=''
    // address.forEach((each)=>{
    //     location+='%20%'+each
    // })
    fetch(`http://localhost:3000/weather?address=${address}`).then((response) => {
    response.json().then((data, error) => {
        if (error) {
            console.log("Unable to fetch data")
            messageOne.textContent="Unable to fetch data"
        }
        else {
            console.log(data)
            messageOne.textContent=`Location: ${data.location}`
            messageTwo.textContent=`Temperature: ${data.temperature}`
        }

    })
    }).catch((error) => {
        console.log('Cannot connect to the internet')
    })
})