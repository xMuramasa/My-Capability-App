const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function getExerciseByRoutineId(routine_id) {

    const endpoint = `/exercises/${routine_id}`;
    const newUrl = url + endpoint;

    const response = await fetch(newUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
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
        return "error obteniendo ejercicios para rutina";
    })
    // Return of the function
    //console.log("response:", response)
    return response
};

export default getExerciseByRoutineId;
