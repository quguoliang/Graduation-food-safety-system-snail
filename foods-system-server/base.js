function success(data) {
    return JSON.stringify({
        code: 1,
        msg: "success",
        data: [data]
    })
}

function error() {
    return JSON.stringify({
        code: 0,
        msg: "error",
        data: []
    })
}
module.exports = {
    success: success,
    error: error
}