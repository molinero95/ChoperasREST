#!/bin/bash

function is_container_healty() {
    local CONTAINER_NAME=$1

    echo ""
    echo "Checking if $CONTAINER_NAME is healty"

    counter_retries=0
    max_retries=25
    status='ko'

    while [ $counter_retries -lt $max_retries ];do

        echo "Retry $(($counter_retries + 1))/$max_retries"
        if [ "$(docker ps -f health=healthy -f name=$CONTAINER_NAME --format '{{.Image}}')" ];then
            status='ok'
            break
        fi

        sleep 3


        (( counter_retries++ ))

    done

    if [ "$status" = "ko" ];then
        echo ""
        echo " [KO] - Service is not responding"
        echo ""
        source "$CURRENT_DIR/stop-acceptance-test-environment.sh"
        exit 1
    fi

    echo ""
    echo " [OK] - Services respond"
    echo ""

}



