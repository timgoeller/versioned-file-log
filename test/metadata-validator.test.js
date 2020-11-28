const MetadataValidator = require('../src/metadata-validator')

describe('MetadataValidator', () => {
  test('fails if no metadata is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata(null)).toThrow(Error)
  })
  test('fails if no name is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({})).toThrow(Error)
  })
  test('fails if no description is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({ name: 'test' }))
      .toThrow(Error)
  })
  test('fails if no author is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({
      name: 'test',
      description: 'some description'
    })).toThrow(Error)
  })
  test('fails if no version is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({
      name: 'test',
      description: 'some description',
      author: 'rick astley'
    })).toThrow(Error)
  })
  test('succeeds if all metadata is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({
      name: 'test',
      description: 'some description',
      author: 'rick astley',
      version: '0.0.1'
    })).not.toThrow(Error)
  })
})
