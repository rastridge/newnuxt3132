# NUXT 3 Version of Buffalo Rugby Club Website

## Originally based on

https://github.com/sfxcode/nuxt3-primevue-starter

# Overview

- Website created with Vue / Nuxt 3 using vscode editor
- Stored in repository at Github
- Build and Deployed at Netlify
- App server accesses data from mysql database 'buffalorugby' at Dreamhost ISP
- App uploads and retrieves images from 'media.buffalorugby.org' at Dreamhost

# Project setup and usage usage

All supporting accounts log in credentials found at buffalorugby.org /admin supporting accounts using username 'rastridge' password ?

## On development machine

Install node:

```
nvm use stable (v21.5.0)
```

Install dependencies:

```
yarn install
```

Run development server:

```
yarn dev
```

## Use VSCode github feature to commit/push to repository

- github repository "rastridge/newnuxt3132"

```
https://github.com/rastridge/newnuxt3132
```

## Change to the repository triggers Netlify build

Netlify site "buffalorugby"

- Paid service

```
https://app.netlify.com/teams/rastridge/sites
```

- site sourced from github repository "rastridge/newnuxt3132"
- All ENV variables must be registered
- All redirects from old website URLs handled by \_redirect file
- Dreamhost buffalorugby.org is DNS only - No web HOST
- Set up Netlify custom external domain for site 'buffalorugby.org' via Dreamhost
- Maintain DNS for email and media subdomain for buffalorugby.org at Dreamhost Domain configuration

```
https://superchlorine.com/2021/01/how-to-set-up-netify-custom-domain-via-dreamhost/
```

# Supporting APIs

A number of outside services are used to implement apps

## Sending Emails

ElasticEmail
setup and Usage

```
https://app.elasticemail.com/login
```

## Sending Text Messages

- Twilio - text messaging

```
https://www.twilio.com/login
```

## API to support image uploads and requests

- Dreamhost - media.buffalorugby.org

```
https://panel.dreamhost.com/
```

Setup

DANGER - all images are stored in 'public' - DO NOT OVERWRITE

- Upload js server '~/Code/brc.org.nuxt3/nuxt3-brc-media-api' to dreamhost
- Enable Proxy server on media.buffalorugby.org

```
alias shell='ssh rastridge@vps30249.dreamhostps.com'
```

Maintain server with pm2

- Start server

```
pm2 ecosystem.config.js
```

- cronjob to restart servers using 'pm2 resurrect'

- for some reason permissions on public folder go bad "Access forbidden" and Dreamhost support needs to fix them.
