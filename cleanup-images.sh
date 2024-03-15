#!/bin/bash

IMAGES_DIR="./images"

if [ -d "$IMAGES_DIR" ]; then
    echo "Cleaning up $IMAGES_DIR..."
    rm -rf "$IMAGES_DIR"/*
    if [ $? -eq 0 ]; then
        echo "Cleanup successful."
    else
        echo "Failed to clean up $IMAGES_DIR."
        exit 1
    fi
else
    echo "Directory $IMAGES_DIR does not exist. Exiting with failure."
    exit 1
fi
