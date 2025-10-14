#!/usr/bin/env bash
cd ~/deployments/geoblocking
source ~/.nvm/nvm.sh
nvm use node
deno run -A main.ts
