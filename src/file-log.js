const hypercore = require('hypercore')
const MetadataValidator = require('./metadata-validator')

class FileLog {
  constructor (externalStorage, localStorageFolder, feedFolder) {
    if (!externalStorage) {
      throw new Error('no storage adapter specified')
    }
    if (!externalStorage.type) {
      throw new Error('storage adapter has to specify a type')
    }
    this.storage = externalStorage
    this.validator = new MetadataValidator()
    if (!localStorageFolder) {
      throw new Error('no local storage folder specfied')
    }
    this.localStorageFolder = localStorageFolder
    if (!feedFolder) {
      throw new Error('no feed folder specfied')
    }
    this.feedFolder = feedFolder
  }

  initialize () {
    this.feed = hypercore(this.feedFolder, { valueEncoding: 'json' })
    return new Promise((resolve, reject) => {
      this.feed.on('ready', () => resolve())
    })
  }

  async update (metadata) {
    this.validator.validateMetadata(metadata)

    if (!this.feed) {
      await this.initialize()
    }

    const self = this
    const locationIdentifier = await self.storage.store(self.localStorageFolder, metadata)

    metadata.location = { locationIdentifier, storageType: self.storage.type }
    await this.appendEntryToFeed({ type: 'update', value: metadata })
  }

  appendEntryToFeed (feedEntry) {
    return new Promise((resolve, reject) => {
      this.feed.append(feedEntry, (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}
module.exports = FileLog
