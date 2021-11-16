console.log('Client side JS file.')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messgaeOne = document.querySelector('#message-1')
const messgaeTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    //console.log(location)

    messgaeOne.textContent = 'Loading...'
    messgaeTwo.textContent = ''

    //fetch('http://localhost:3000/weather?address='+location+'').then((response) => {
    fetch('/weather?address='+location+'').then((response) => {
    response.json().then((data) => {

            if (data.error) {
                //console.log(data.error)
                messgaeOne.textContent = data.error
            } else {
                //console.log(data.Location)
                //console.log(data.Forecast)
                messgaeOne.textContent = data.Location
                messgaeTwo.textContent = data.Forecast
            }
        })
    })
})