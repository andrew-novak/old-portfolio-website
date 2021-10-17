#!/bin/bash

SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR=$( dirname $SCRIPTS_DIR )

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

if [[ ! -d "${ROOT_DIR}/api" ]]
then
  printf "${RED}No ${BLUE}/api ${RED}in the project root directory\n"
  exit
fi

if [[ -f "${ROOT_DIR}/api/.env" ]]
then
  printf "${BLUE}.env ${RED}already exists in ${BLUE}api/\n"
  exit
fi

# default env values
LINE_1='PERSONAL_WEBSITE_MONGO_URL="mongodb://localhost:27017/personalWebsiteDev"'
LINE_2='PERSONAL_WEBSITE_API_PORT=3002'
LINE_3='PERSONAL_WEBSITE_API_ROOT_ROUTE="/"'
LINE_4='PERSONAL_WEBSITE_JWT_SECRET="simple-unsafe-dev-secret"'
LINE_5="PERSONAL_WEBSITE_IMGS_LOCAL=\"${ROOT_DIR}/imagesDev\""
LINE_6='PERSONAL_WEBSITE_IMGS_ACCESS="/images-dev"'


printf "$LINE_1\n$LINE_2\n$LINE_3\n$LINE_4\n$LINE_5\n$LINE_6" >> "${ROOT_DIR}/api/.env"

printf "${BLUE}.env ${GREEN}has been created in the ${BLUE}api/\n"
