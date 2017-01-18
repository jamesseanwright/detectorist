#!/usr/bin/env bash

npm run build
npm run copy-for-browser-tests

./node_modules/.bin/static test/browserTests &
server_pid=$!

mocha test/browserTests/tests.js --require test/init

kill -9 $server_pid