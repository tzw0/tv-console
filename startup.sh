#!/bin/bash
sleep 2
ipAddr=$(ifconfig | grep 192.168.18 | awk '{print $2}')

echo trying to connect to ${ipAddr}...
until curl -s -f -o /dev/null "http://${ipAddr}/rat-tv"
do
  echo Web Server not ready...
  sleep 1

  ipAddr=$(ifconfig | grep 192.168.18 | awk '{print $2}')
done

echo Ready
firefox -url http://${ipAddr}/rat-tv &> /dev/null #& xdotool search --sync --onlyvisible --class "Firefox" windowactivate key F11
