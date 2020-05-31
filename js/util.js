const {
    readFile
} = require('fs');

module.exports.readJson = (path, cb) => {
    readFile(require.resolve(path), (err, data) => {
        if (err)
            cb(err)
        else
            cb(null, JSON.parse(data))
    })
}