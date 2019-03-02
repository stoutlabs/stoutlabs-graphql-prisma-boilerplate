import '@babel/polyfill/noConflict'; //needed for prod (regenerators, async, await, etc.)

import server from "./server";
const port = process.env.PORT || 8000;

server.start({ port: port }, () => {
  console.log("Yoga Server running on port 8000!");
});