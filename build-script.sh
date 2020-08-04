#!usr/bin/bash

echo "library init to build"
npx yarn install && npx yarn build
cd preview
npx yarn install && npx yarn build
echo "build finished"
