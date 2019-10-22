const path = require('path')

const createFilelink = (headData, fileName) => headData.repo.html_url + path.join('/blob', headData.ref, fileName)

module.exports = {
  createFilelink
}