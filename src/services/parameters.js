const getErrorMessage = (response, data) => {
    console.log(response.status)
    if (response.ok) {
        return 'Success'
    } else if (response.status === 404 || response.status === 500) {
        return data.detail
    } else if (response.status === 422) {
        return data.detail[0].msg
    } else {
        return 'Unknown error. See logs.'
    }
}

//const BASE_URL = "http://192.168.0.75:8000"
//const BASE_URL = "https://stereo-backend.fly.dev"
const BASE_URL = "http://localhost:8000"

const getParameters = async () => {
    try {
        const response = await fetch(`${BASE_URL}/parameters`)
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            throw new Error(`${response.status} ${getErrorMessage(response, data)}`);
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

const getLatestPhotos = async (offset, limit) => {
    try {
        const response = await fetch(`${BASE_URL}/photos?offset=${offset}&limit=${limit}`)
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            throw new Error(`${response.status} ${getErrorMessage(response, data)}`);
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

const getObjectDimensions = async (id, coords, setErrorMessage, setOpenError, setDimensionData, setOpenDialog) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...coords,
        })
    }

    let data;
    let response;
    try {
        response = await fetch(`${BASE_URL}/get_object_dimensions?id=${id}`, options);
        data = await response.json();
        if (!response.ok) {
            setErrorMessage(
                `Error ${response.status}: ${getErrorMessage(
                    response,
                    data
                )}`
            );
            throw new Error(
                `${response.status} ${getErrorMessage(response, data)}`
            );
        }
        console.log("RETURNED DISSTANCE STUFF IS", data)
        setDimensionData(data)
        setOpenDialog(true)
        return data
    } catch (err) {
        setOpenError(true)
        console.log(err.message);
    }
};




export default  {
    getErrorMessage, getParameters, getLatestPhotos, getObjectDimensions, BASE_URL
}

