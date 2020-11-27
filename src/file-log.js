const hypercore = require('hypercore')

class FileLog {
  constructor (storage, initialMetadata) {
    this.storage = storage
  }
}

module.exports = FileLog