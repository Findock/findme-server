![FindMeServer](https://user-images.githubusercontent.com/39082174/151669418-a59f4ad7-e568-43af-9602-c3bb8a910a45.png)

# 🐶💻 FindMe node.js Server

Written in NestJS v8

© Findock 2022

[![CircleCI](https://circleci.com/gh/Findock/findme-server/tree/master.svg?style=svg)](https://circleci.com/gh/Findock/findme-server/tree/master)
[![codecov](https://codecov.io/gh/Findock/findme-server/branch/master/graph/badge.svg?token=HCTEE8KV94)](https://codecov.io/gh/Findock/findme-server)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server) 

[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=Findock_findme-server&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=Findock_findme-server)

# Running FindMe server in docker

### Requirements

- Docker >= v20.10
- Docker Compose >= v1.29.2

### Start

Start server in terminal with logs

```
$> yarn docker:up
```

OR start server detached 

```
$> yarn docker:up -d
```

Stop server running docker containers (detached)

```
$> yarn docker:down
```

Remove server docker image (in case of npm dependecy mismatch)

```
$> yarn ocker:clear
```
