const nock = require('nock')
const myProbotApp = require('..')
const { Probot } = require('probot')

const payloadFail = require('./fixtures/payloadFail.json')

nock.disableNetConnect()

describe('Start Pull Request Open', () => {
  let probot

  beforeEach(() => {
    probot = new Probot({})

    const app = probot.load(myProbotApp)
    app.app = {
      getInstallationAccessToken: (option) => Promise.resolve('test')
    }
  })

  test('when no markdown files are editted', async () => {
    nock('https://api.github.com')
      .post('/app/installations/1189219/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .get('/repos/Im-D/probot-practice/pulls/32/files')
      .reply(200, [
        {
          filename: 'test.js'
        }
      ])

    nock('https://api.github.com')
      .patch('/repos/Im-D/probot-practice/pulls/32', body => {
        if (body.body === '') {
          return true
        }
        return false
      })
      .reply(200)

    await probot.receive({ name: 'pull_request', payload: payloadFail })
  })
})
