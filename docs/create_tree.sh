#!/bin/bash

# Change directory to the parent directory of the script
cd "$(dirname "$0")/.." || exit

# Generate the tree structure and save it to docs/tree.txt
tree -I 'node_modules|.git|.vscode|docs|.gitignore' -a -L 3 --dirsfirst > docs/tree.txt