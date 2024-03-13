#!/bin/bash

cleanup_directory() {
    local DIR=$1

    if [ -d "$DIR" ]; then
        echo "Cleaning up $DIR..."
        rm -rf "$DIR"/*
        if [ $? -eq 0 ]; then
            echo "Cleanup successful."
        else
            echo "Failed to clean up $DIR."
            exit 1
        fi
    else
        echo "Directory $DIR does not exist. Exiting with failure."
        exit 1
    fi
}

UPLOADS_DIR="./uploads"
IMAGES_DIR="./images"

cleanup_directory "$UPLOADS_DIR"
cleanup_directory "$IMAGES_DIR"