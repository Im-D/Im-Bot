const path = require('path')

const createFilelink = (headData, branch, fileName) => headData.repo.html_url + path.join('/blob', branch, fileName)

module.exports = {
  createFilelink
}