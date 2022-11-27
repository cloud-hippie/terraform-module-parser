# terraform-module-parser

This is a POC for what one might be able to do with a terrafrom setup in which they have a folder that has Terraform Modules in one mater folder.

Eventually I would like to use this to parse Terraform modules to then add the terraform module inputs as a form in Backstage which would then create a Pull Request with the module created.

## Introduction

Strictly a POC, but if you want to run this and see the output.

Requires Node >= 16


```bash
yarn install
```

Installs all of the dependencies including the TS dependencies.

Build and Run

```bash
yarn tsc main.ts && node main.js
```

## Incoming

- Cli Arguments.
- Deprecate into a Backstage Plugin.
