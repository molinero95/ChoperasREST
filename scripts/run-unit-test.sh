#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

pushd  "$CURRENT_DIR/../choperas"
    npm install --quiet
    npm run test

    rm -r node_modules
popd
