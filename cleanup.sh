#!/bin/bash

UPLOADS_DIR="./uploads"

if [ -d "$UPLOADS_DIR" ]; then
    echo "Cleaning up $UPLOADS_DIR..."
    rm -rf "$UPLOADS_DIR"/*
    if [ $? -eq 0 ]; then
        echo "Cleanup successful."
    else
        echo "Failed to clean up $UPLOADS_DIR."
        exit 1
    fi
else
    echo "Directory $UPLOADS_DIR does not exist. Exiting with failure."
    exit 1
fi
