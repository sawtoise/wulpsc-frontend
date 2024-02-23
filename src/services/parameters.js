const getErrorMessage = (response, data) => {
    console.log(response.status)
    if (response.ok) {
        return 'Success'
    } else if (response.status === 404) {
        return data.detail
    } else if (response.status === 422) {
        return data.detail[0].msg
    } else {
        return 'Unknown error. See logs.'
    }
}

const BASE_URL = "https://stereo-backend.fly.dev"
//const BASE_URL = "http://localhost:8000"

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

export default  {
    getErrorMessage, getParameters, getLatestPhotos, BASE_URL
}

