const fs = require('fs')
const sourceDir = './Files'


const filePath = fs.readdirSync(sourceDir)

module.exports = filePath