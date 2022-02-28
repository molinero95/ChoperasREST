#!/bin/bash

pushd ../../
    docker-compose build
    docker-compose up -d 
popd

npm run test


pushd ../../
    docker-compose down
popd
