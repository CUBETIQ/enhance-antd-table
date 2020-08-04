#!usr/bin/bash

echo "library init to build"
npx yarn install && npx yarn build
cd example && npx yarn link && npx yarn link "enhance-antd-table-example"
npx yarn install && npx yarn build

