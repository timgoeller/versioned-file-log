const hypercore = require('hypercore')
const MetadataValidator = require('./metadata-validator')

class FileLog {
  constructor (storage, localStorageFolder, initialMetadata) {
    this.storage = storage
    this.validator = new MetadataValidator()
    this.validator.validateMetadata(initialMetadata)
  }
}

module.exports = FileLog
