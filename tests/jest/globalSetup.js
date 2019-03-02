require('babel-register');
require('@babel/polyfill/noConflict');

const server = require('../../src/server').default;
const port = process.env.PORT || 8000;

module.exports = async () => {
  global.httpServer = await server.start({ port: port }, () => {
    console.log("Yoga (Testing) Server running on port 8000!");
  });
}