class MetadataValidator {
  validateMetadata (metadata) {
    if (!metadata.name) {
      throw new Error('no name specified in metadata')
    }
    if (!metadata.description) {
      throw new Error('no description specified in metadata')
    }
    if (!metadata.author) {
      throw new Error('no author specified in metadata')
    }
    this.validateVersion(metadata.version)
  }

  validateVersion (version) {
    if (!version) {
      throw new Error('no version specified in metadata')
    }
    // TODO: validate version according to semver and also check previous version
  }
}

module.exports = MetadataValidator
