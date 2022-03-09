#!/bin/bash

function run_health_check() {
    local SERVICE_NAME=$1
    local URI=$2

    echo ""
    echo "Checking $SERVICE_NAME is running"

    counter_retries=0
    max_retries=10
    status='ko'

    while [ $counter_retries -lt $max_retries ];do

        echo "Checking $(($counter_retries + 1))/$max_retries"
        curl -s "$URI" | grep '{"status":"UP"}' > /dev/null 2>&1
        if [ "$?" = "0" ];then
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



