#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

source "$CURRENT_DIR/build.sh"
docker swarm init
docker stack deploy --compose-file "$CURRENT_DIR/../docker-compose.yaml" choperas-rest
