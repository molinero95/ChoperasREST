#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

pushd  "$CURRENT_DIR/../choperas"
    echo "Running check style..."
    npm install --quiet
    npm run lint
    if [ "$?" -ne "0" ];then
        echo "check style KO"
		exit 1
	fi
popd
