#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

docker swarm init
docker stack deploy --compose-file "$CURRENT_DIR/../docker-compose.yaml" choperas-rest
