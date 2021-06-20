#!/bin/bash

SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR=$( dirname $SCRIPTS_DIR )
TARGET_DIR="${ROOT_DIR}/devImgsApi/images/"

printf "Empting directory: ${TARGET_DIR}\n"

rm -rf ${TARGET_DIR}*

mongo --eval "db.dropDatabase();" personalWebsiteDev
