const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function getUser() {

    const endpoint = "/results";    //users*???
    const newUrl = url + endpoint;

    const response = await fetch(newUrl)
        .then(function (resp) {
            return resp.json();
        })
        // On success
        .then(function (data) {
            return data;
        })
        // On Failure
        .catch(function () {
            return "error obteniendo todos los resultados";
        })

    // Return of the function
    //console.log("API response:", response)
    return response
};

export default getUser;
