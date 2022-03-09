#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

source "$CURRENT_DIR/start-acceptance-test-environment.sh"

source "$CURRENT_DIR/check-service-is-running.sh"
run_health_check "choperas-rest" "http://localhost:8888/system/health"

pushd  "$CURRENT_DIR/../acceptance-test"
    npm install --quiet
    npm run test

    rm -r node_modules
popd
source "$CURRENT_DIR/stop-acceptance-test-environment.sh"

