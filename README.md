tutorial: https://www.youtube.com/watch?v=yuVVKB0EaOQ&ab_channel=MichaelGuay

## Description
changed docker-compose.yml to working version,
because ```bitnami``` on Mac M1 doesn't work

Then the custom service and connection like his - does not work, a problem with the config
must be manually connected in each app/program (you can create a helper function that will be the same and not as a service)

## installation
```
$ npm i
```

## run
```
$ docker-compose up -d --build -V
```