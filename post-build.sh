#!/bin/env sh

cp .svelte-kit/output/client/sw.js .vercel/output/static
cp .svelte-kit/output/client/workbox-*.js .vercel/output/static
