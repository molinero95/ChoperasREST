#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

source "$CURRENT_DIR/start-acceptance-test-environment.sh"

docker run choperas-rest-acceptance-test:latest

source "$CURRENT_DIR/stop-acceptance-test-environment.sh"

