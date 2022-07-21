const https = require('https');
const { createTerminus } = require('@godaddy/terminus');

function onSignal() {
    console.log('server is starting cleanup');
    return Promise.all([
        // your clean logic, like closing database connections
    ]);
}

function onShutdown() {
    console.log('cleanup finished, server is shutting down');
}

function healthCheck({ state }) {
    // `state.isShuttingDown` (boolean) shows whether the server is shutting down or not
    return Promise.resolve(
        // optionally include a resolve value to be included as
        // info in the health check response
    )
}

const server = https.createServer((request, response) => {
    response.end(
        `<html>
      <body>
        <h1>Hello, World!</h1>
       </body>
     </html>`
    );
})

const options = {
    // health check options
    healthChecks: {
        '/healthcheck': healthCheck,    // a function accepting a state and returning a promise indicating service health,
        verbatim: true,                 // [optional = false] use object returned from /healthcheck verbatim in response,
        __unsafeExposeStackTraces: true // [optional = false] return stack traces in error response if healthchecks throw errors
    }
}