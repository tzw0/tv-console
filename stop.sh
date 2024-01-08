#!/bin/bash
var=$(docker ps -q --filter ancestor=rat-tv-live)
if [ "$var" != "" ] 
then
    echo "stopping instance $var"
    docker stop $var
else
    echo "no rat-tv-live instance running"
fi