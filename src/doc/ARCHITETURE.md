# Architeture

When developing the MVP of this project, it was noticed that it did not have a good structure and that, due to this, the implementation of new features would be harmed. Thinking about solving this problem, the refactoring of the project's architecture was proposed, following what is proposed by Robert C. Martin in his works Clean Code and Clean Architecture

# Project Structure and folders

using the model above

```bash
|-- src
|   |-- domain
|   |   |-- __test__
|   |   |-- entities
|   |   |-- validations
|   |-- usecase
|   |   |-- __test__
|   |-- infra
|   |   |-- database
|   |-- repository
|   |   |-- sql
|   |   |-- inMemory
|   |-- services
|   |-- events
|   |-- adapters
|   |-- app
|   |   |-- controller
|   |   |-- middleware
|   |   |-- routes
|   |   |-- view
```

## Domain

Domain is a layer to define structures and data layers using in business rules

### Entity

abstraction VO-like class represent entities in system

### Validation

Functional and structured validations rules consulming by entities

## Usecase

Business implementation iteself for every interaction in system
e.g.
CreateDevice.js has been a implementation for creating device handler

## infra

Abstraction and configurations for using infra persistence layer

### Database

Specific object base for setting database for every repository implementation
.e.g If you have DeviceRepositorySQL and deviceRepositoryMongoDB , in database you shoud been have sql.js and mongodb.js exportation

## Repository

Interface and concrete implementation class for every repository interation

## Services

External services providers and consume
.e.g. if you have an firebase use in this project, this implementation has been specific in services

## events

Events it's a set of events handler using for deacouple and one way to implements triggers in application usecases without depends directly
.e.g: if you send push notification when device is updated, you dispatch notification using handler events based on emmit events for usecases

## adapters

follw onion architeture model, you shuoldn't inct directly dependcy for these layers, insteread using adapters for transform values and hidden transformation abstracton

## app

it's about server implementation
