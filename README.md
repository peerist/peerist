![Peerist](./images/social.png)

> Write better scientific papers. **Faster.**

Peerist is a service that helps academics get timely feedback on their papers before submitting for publishing. It is built with next.js and Go lambdas, hosted on Now by Zeit, utilizing Hasura and Postgres.

## Developing

The following dependencies are required for running locally:

- node.js
- Now CLI
- Docker
- Terraform
- Hasura CLI

### Running

First, install the relevant dependencies:

```sh
cd www
yarn
```

Then, verify that Docker is running and start the backend services:

```sh
cd ..
docker -v
terraform apply # Answer yes to the prompt
```

If you wish to view the Hasura console, copy the `admin_secret` output variable printed by the previous command, and use the Hasura CLI to launch the console:

```sh
cd hasura
hasura console --admin-secret "SECRET HERE"
```

Finally, launch the Now-hosted services and begin coding:

```sh
cd ..
now dev
```
