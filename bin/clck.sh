
#!/bin/bash

# check if an argument was provided or show usage
if [ -z "$1" ]; then
  echo "Missing URL! Usage: $0 <url>"
  exit 1
fi

# get long URL from the command line argument and urlencode it
URLENCODED_URL=$( echo urlencode "$1" )

# send GET request to the clck.ru to get the short URL
SHORTENED_URL=$( curl -sL "http://clck.ru/--?url=$URLENCODED_URL" )

# check if we got a response
if [ -n "$SHORTENED_URL" ]; then
  echo "$SHORTENED_URL"
else
  echo "ERROR: Failed to retrieve the shortened URL."
  exit 1
fi