
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +


find . -name "yarn.lock" -o -name "package-lock.json" -exec rm -f '{}' +



find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
rm -f yarn.lock
yarn cache clean
yarn install
