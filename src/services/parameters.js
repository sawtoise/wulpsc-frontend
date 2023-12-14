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

const getParameters = async () => {
    try {
        const response = await fetch('https://stereo-backend.fly.dev/parameters')
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
    getErrorMessage, getParameters
}

