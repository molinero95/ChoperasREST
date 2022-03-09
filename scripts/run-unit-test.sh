#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

pushd  "$CURRENT_DIR/../choperas-rest"
    echo "Running unit tests..."
    npm install --quiet
    npm run test
    if [ "$?" -ne "0" ];then
        echo "unit tests KO"
		exit 1
	fi
popd
