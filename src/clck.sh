#!/bin/bash

if [ -z "$1" ]; then
  echo "URL-shortener\nUsage: $0 <url>"
  exit 1
fi
echo "URL to be shortened: $1"
ENCODED=$( urlencode "$1" )
echo "Encoded URL: $ENCODED"
REQUEST="https://clck.ru/--?url=$ENCODED"
echo "Calling: $REQUEST..."
SHORTENED=$( curl -s "$REQUEST" )
echo "Shortened URL: $SHORTENED"
