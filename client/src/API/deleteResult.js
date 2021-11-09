const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com"; 

async function deleteResult(result_id) {

    const endpoint = `/results/${result_id}`;
    const newUrl = url + endpoint;

    const response = await fetch(newUrl, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
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
            return "error agregando resultado";
        })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default deleteResult;
