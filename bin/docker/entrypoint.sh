#!/bin/bash

#  Starts local mongdb installation.
#  Starts application main.js
#
#  MONGO_URL env variable will prevent local db start
#
set -e

# set default meteor values if they arent set
: ${PORT:="80"}
: ${ROOT_URL:="http://localhost"}
: ${MONGO_URL:="mongodb://127.0.0.1:27017/meteor"}

# set default node executable
: ${NODE:="node"}

#start mongodb (optional)
if [[ "${MONGO_URL}" == *"127.0.0.1"* ]]; then
  echo "Starting local MongoDB..."
  # startup mongodb
  /usr/bin/mongod --smallfiles --fork --logpath /var/log/mongodb.log

fi

if [[ "${REACTION_ENVIRONMENT}" == "dev" ]]; then
  echo "Running Reaction in DEV mode ..."
  # DEV
  # run reaction from source
  /var/www/src/reaction reset
  /var/www/src/reaction
else
  echo "Running Reaction in PROD mode ..."
  # PROD
  # Run meteor
  exec $NODE ./main.js
fi
