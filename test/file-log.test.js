const FileLog = require('../src/file-log')
const del = require('del')
const path = require('path')

function testStorageAdapter () {
  const testStorageAdapter = { type: 'test', store: jest.fn() }
  testStorageAdapter.store
    .mockReturnValueOnce(new Promise((resolve) => resolve('firstLocation')))
    .mockReturnValueOnce(new Promise((resolve) => resolve('secondLocation')))

  return testStorageAdapter
}

function testMetadata () {
  return {
    name: 'test',
    description: 'some description',
    author: 'rick astley',
    version: '0.0.1'
  }
}

async function removeFeedFolders () {
  await del(['test/feed'])
}

let fileIndex = 0
function defaultFileLog (index = fileIndex++) {
  return new FileLog(
    testStorageAdapter(), `./test/storage/test-storage-${index}`, `./test/feed/test-feed-${index}`
  )
}

describe('FileLog', () => {
  beforeAll(() => {
    return removeFeedFolders()
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })
  describe('#constructor', () => {
    test('fails if no external storage adapter is provided', () => {
      expect(() => new FileLog()).toThrow(Error)
    })
    test('fails if no local storage folder is specified', () => {
      expect(() => new FileLog(testStorageAdapter())).toThrow(Error)
    })
    test('fails if no feed folder is specified', () => {
      expect(() => new FileLog(testStorageAdapter(), './test-storage')).toThrow(Error)
    })
    test('initializes the object', () => {
      const fileLog = new FileLog(
        testStorageAdapter(), './test/storage/test-storage', './test/feed/test-feed'
      )
      expect(fileLog.storage).toBeDefined()
      expect(fileLog.validator).toBeDefined()
      expect(fileLog.localStorageFolder).toEqual('./test/storage/test-storage')
      expect(fileLog.feedFolder).toEqual('./test/feed/test-feed')
    })
  })
  describe('#initialize', () => {
    test('creates feed', async () => {
      jest.spyOn(FileLog.prototype, 'update')
        .mockImplementation(() => new Promise((resolve) => resolve('')))
      const fileLog = defaultFileLog()
      await fileLog.initialize(testMetadata())
      expect(fileLog.feed).toBeDefined()
    })
  })
  describe('#update', () => {
    test('appends metadata to feed', async () => {
      const fileLog = defaultFileLog()
      const metadata = testMetadata()
      await fileLog.update(metadata)
      return new Promise((resolve) => {
        fileLog.feed.get(0, (err, data) => {
          if (err) throw err
          expect(data.type).toMatch('update')
          expect(data.value.location).toEqual({ locationIdentifier: 'firstLocation', storageType: 'test' })
          expect(data.value).toEqual(metadata)
          resolve()
        })
      })
    })
  })
})
