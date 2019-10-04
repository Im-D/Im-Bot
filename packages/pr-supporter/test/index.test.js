const nock = require('nock')
const myProbotApp = require('..')
const { Probot } = require('probot')
const payload = require('./fixtures/pull_request.opened')
const mockFileList = [
  {
    filename: 'README.md',
    blob_url: 'https://github.com/Im-D/probot-practice/blob/b790602dea6a66f47062550a5330bf5b6f749d0a/README.md'
  },
  {
    filename: 'test/prtest.js',
    blob_url: 'https://github.com/Im-D/probot-practice/blob/b790602dea6a66f47062550a5330bf5b6f749d0a/test/prtest.js'
  }
]

const mockResult = '[README.md](https://github.com/Im-D/probot-practice/blob/b790602dea6a66f47062550a5330bf5b6f749d0a/README.md)\n'

nock.disableNetConnect()

describe('Start Pull Request Open', () => {
  let probot

  beforeEach(() => {
    probot = new Probot({})

    const app = probot.load(myProbotApp)
    app.app = () => 'test'
  })

  test('creates a comment when an pull request is opened', async () => {
    nock('https://api.github.com')
      .post('/app/installations/1189219/access_tokens')
      .reply(200, { token: 'test' })

    nock('https://api.github.com')
      .get('/repos/Im-D/probot-practice/pulls/34/files')
      .reply(200, mockFileList)

    nock('https://api.github.com')
      .patch('/repos/Im-D/probot-practice/pulls/34', body => {
        console.log('=========================body', body)
        expect(body).toMatchObject({ body: mockResult })
        return true
      })
      .reply(200)

    await probot.receive({ name: 'pull_request', payload })
  })
})
