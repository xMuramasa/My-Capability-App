const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function checkUser(email, password) {

    const endpoint = "/check";
    const newUrl = url + endpoint;

    //const date = Date();

    const data = {
        "email": email,
        "password": password
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
            return "not_found";
        })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default checkUser;
