# Danger-js CI

This is a playground for Danger-js.

If you're looking for an in depth tutorial on how to setup Danger, you can head over to [Getting started with Danger](https://danger.systems/js/guides/getting_started.html) or DM me on [twitter](https://twitter.com/tamnguyenctg)

## Getting Started

Follow these steps to get the project up and running

### Install

```
yarn install or npm install
```

### Test out Danger

Just create a PR and Github Action will handle the rest

#### Or run it locally

You still need an actual PR to run your local rules, which you can modify in dangerfile.ts

```
yarn danger pr <pr_url>
```

## Some example rules

> console.log warning - [PR#13](https://github.com/tamnguyenledev/danger-js-ci/pull/13)
> 
> Empty file warning - [PR#14](https://github.com/tamnguyenledev/danger-js-ci/pull/14)
> 
> Require Jira ticket - [PR#15](https://github.com/tamnguyenledev/danger-js-ci/pull/15)
> 
> Require reviewer - [PR#15](https://github.com/tamnguyenledev/danger-js-ci/pull/15)
> 
> Big PR warning - [PR#15](https://github.com/tamnguyenledev/danger-js-ci/pull/15)

## Author

[**Tam Nguyen**](https://www.linkedin.com/in/tam-nguyen-5b5a8b174/) - Front-end Engineer

## License

This project is licensed under the MIT License
