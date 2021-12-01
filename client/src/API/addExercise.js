const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function addExercises(routine_id, ex_name, reps, series, weight) {

    const endpoint = "/exercises";
    const newUrl = url + endpoint;

    const data = {
        "routine_id": routine_id,
        "ex_name": ex_name,
        "reps": reps,
        "series": series,
        "weight": weight
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
        return "error agregando ejercicio";
    })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default addExercises;
