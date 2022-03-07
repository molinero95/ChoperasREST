#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

pushd "$CURRENT_DIR/../acceptance-test"
    docker build -t choperas-rest-acceptance-test:latest .
popd


docker swarm init
docker stack deploy --compose-file "$CURRENT_DIR/../docker-compose.yaml" choperas-rest
