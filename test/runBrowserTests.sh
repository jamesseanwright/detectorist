#!/usr/bin/env sh

npm run build
npm run copy-for-browser-tests

./node_modules/.bin/static test/browserTests > /dev/null &
server_pid=$!

mocha test/browserTests/tests.js --require test/init

kill -9 $server_pid