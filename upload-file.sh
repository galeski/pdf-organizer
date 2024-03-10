#!/bin/bash

# Check if exactly two arguments are given (file path and API URL)
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <file_path> <api_url>"
  exit 1
fi

# Assign the arguments to variables
FILE_PATH="$1"
API_URL="$2"

# Check if the file exists
if [ ! -f "$FILE_PATH" ]; then
  echo "Error: File does not exist."
  exit 1
fi

# Perform the file upload
curl -X POST -F "file=@${FILE_PATH}" "${API_URL}"

# Check the exit status of the curl command
if [ "$?" -eq 0 ]; then
  echo " OK."
else
  echo " FAIL."
fi
