const { TestScheduler } = require("jest")
const MetadataValidator = require("../src/metadata-validator")

describe('MetadataValidator', () => {
  test('it should fail if no name is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({})).toThrow(Error)
  })
  test('it should fail if no description is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({ name: 'test' }))
      .toThrow(Error)
  })
  test('it should fail if no author is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({
      name: 'test',
      description: 'some description'
    })).toThrow(Error)
  })
  test('it should fail if no version is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({
      name: 'test',
      description: 'some description',
      author: 'rick astley'
    })).toThrow(Error)
  })
  test('it should succeed if all metadata is specified', () => {
    const validator = new MetadataValidator()
    expect(() => validator.validateMetadata({
      name: 'test',
      description: 'some description',
      author: 'rick astley',
      version: '0.0.1'
    })).not.toThrow(Error)
  })
})
