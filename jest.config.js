module.exports = {
  moduleDirectories: [
    'node_modules',
   // add the directory with the test-utils.js file, for example:
   'utils', // a utility folder
    __dirname, // the root directory
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
  // ... other options ...
}