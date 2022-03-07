#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

source "$CURRENT_DIR/run-unit-test.sh"

pushd "$CURRENT_DIR/../choperas"
    docker build -t choperas-rest:latest .
popd

pushd "$CURRENT_DIR/../"
    docker save -o choperas-rest.tar choperas-rest
    gzip -f choperas-rest.tar > choperas-rest.tar.gz
popd
