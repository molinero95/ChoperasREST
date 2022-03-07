#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

source "$CURRENT_DIR/start-acceptance-test-environment.sh"

#TODO: Add healthChecks here 

pushd  "$CURRENT_DIR/../acceptance-test"
    npm install --quiet
    npm run test

    rm -r node_modules
popd
source "$CURRENT_DIR/stop-acceptance-test-environment.sh"

