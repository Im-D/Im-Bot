# pr-supporter

Auto create markdown file **link** in PR body

## Getting Started

### Installing

Write pr-supprter repo path in your action yml file and Register beta tester

```yml
Im-D/Im-Bot/packages/pr-supporter@master
```

## Running the tests

1. [Register Github Beta Tester](https://github.com/features/actions)

2. Write your `yml` file

```yml
name: "test-pr-supporter"
on:
  pull_request:
    types: [opened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: test
      uses: Im-D/Im-Bot/packages/pr-supporter@master
      with:
        myToken: ${{ secrets.GITHUB_TOKEN }}
```

3. Request Pull-Request

## Built With

* [Github Action](http://www.dropwizard.io/1.0.2/docs/)

> GitHub Actions enables you to create custom software development life cycle (SDLC) workflows directly in your GitHub repository.

## ~~Contributing~~

~~Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.~~

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **BKJang** - [PR-Supporter](https://github.com/Im-D/Im-Bot/tree/master/packages/pr-supporter)
* **SeonHyungJo** - [PR-Supporter](https://github.com/Im-D/Im-Bot/tree/master/packages/pr-supporter)

~~See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.~~

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Im-D/Im-Bot/blob/docs/LICENSE) file for details

<sup> © 2019 Im-D <jp302119@gmail.com> </sup>