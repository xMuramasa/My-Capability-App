const fetch = require('node-fetch');

const url = "https://server-mycap.herokuapp.com";

async function updateUserData(id, age, gender, height, weight, fat_percent, freq) {

    const endpoint = "/user_update";
    const newUrl = url + endpoint;
    console.log("FETCH")

    const data = {
        "age": age,
        "gender": gender,
        "height": height,
        "weight": weight,
        "fat_percent": fat_percent,
        "freq": freq,
        "id": id
    }

    const response = await fetch(newUrl, {
        method: 'PATCH',
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
            return "update_error";
        })

    // Return of the function
    //console.log("response:", response)
    return response
};

export default updateUserData;
