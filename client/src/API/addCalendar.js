const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function addCalendar(user_id, routine_id, date) {

    const endpoint = "/routines";
    const newUrl = url + endpoint;

    const data = {
        "user_id": user_id,
        "routine_id": routine_id,
        "date": date
    }
    
    const response = await fetch(newUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(function (resp) {
        return resp.json();
    })
    // On success
    .then(function (data) {
        return data;
    })
    // On Failure
    .catch(function () {
        return "error agregando resultado";
    })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default addCalendar;
