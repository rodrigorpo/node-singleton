# node-singleton
This repository is an example of Node singletons. It is divided in three folders containing pure node injection, node injection with inversify and nest context

The pros/cons of which one that will be explained here

## Vantages:
- Helps maintain application with SOLID principles
- Better resource's use
- DI - async dependencies will be first instancied

## Pure injection
![Image Pure Injection](http://url/to/img.png)

### Benefits
- Lightweigth and faster
- Single point of control

### Disadvantages
- For each dependency that requires another you must inject manually
- More time spending on "configuring envriomment"

## Inversify
- Lightweigth and faster
- Single point of control

### Benefits
- Lightweigth and faster (Adds a certain amount of time to start the application
- Single point of control

### Disadvantages
- Adds a certain amount of time to start the application searching module
- Circle reference must be manually treated

## Nest

### Benefits
- Circle reference must be manually treated

### Disadvantages
- Like java spring, it initialize a lot of dependency, even you use only few of these
- Heavy than pure node

