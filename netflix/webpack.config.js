const path = require('path');

module.exports = {
  // your existing configuration
  resolve: {
    fallback: {
      "fs": false,  // fs is not available in the browser environment
      "path": require.resolve('path-browserify'),
      "child_process": false, // child_process is not available in the browser environment
      "stream": require.resolve('stream-browserify'),
      "os": require.resolve('os-browserify/browser'),
      "constants": require.resolve('constants-browserify')
    }
  },
  // other configurations
};
