const info = (...info) => {
    console.log(...info)
}

const error = (...errors) => {
    console.error(...errors)
}

module.exports = { info, error }