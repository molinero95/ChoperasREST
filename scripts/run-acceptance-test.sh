#!/bin/bash

CURRENT_DIR="$( cd "$( dirname "$0" )" && pwd )"

source "$CURRENT_DIR/start-acceptance-test-environment.sh"

#TODO: Add healthChecks here

echo ""
echo "Comprobando que el API responda correctamente:"

counter_retries=0
max_retries=10
status='ko'

while [ $counter_retries -le $max_retries ];do

	echo "Comprobación $(($counter_retries + 1))/$max_retries"
	curl -s http://localhost:8888/system/health | grep '{"status":"UP"}' > /dev/null 2>&1
	if [ "$?" = "0" ];then
		status='ok'
		break
	fi

	sleep 3


	(( counter_retries++ ))

done

if [ "$status" = "ko" ];then
	echo ""
	echo " [KO] - El API no parece estar corriendo correctamente"
	echo ""
	source "$CURRENT_DIR/stop-acceptance-test-environment.sh"
	exit 1
fi

echo ""
echo " [OK] - El endpoint respode como se espera"
echo ""

pushd  "$CURRENT_DIR/../acceptance-test"
    npm install --quiet
    npm run test

    rm -r node_modules
popd
source "$CURRENT_DIR/stop-acceptance-test-environment.sh"

