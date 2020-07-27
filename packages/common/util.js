const path = require('path')

const createFilelink = (headData, branch, fileName) => encodeURI(headData.repo.html_url + path.join('/blob', branch, fileName))

module.exports = {
  createFilelink
}
