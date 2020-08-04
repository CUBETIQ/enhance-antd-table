#!usr/bin/bash

echo "library init to build"
yarn install && yarn build 
cd example && yarn link "enhance-antd-table-example" 
yarn install && yarn build 

