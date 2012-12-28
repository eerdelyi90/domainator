locomotive-sequelize-boilerplate
================================

A LocomotiveJS + Sequelize boilerplate project.

## What it is

This is a really simple [LocomotiveJS](http://locomotivejs.org/) boilerplate which implements a very basic 
user management system, using the [Sequelize](http://sequelizejs.com) ORM to provide models.

It should be entirely self-contained, and will create a SQLite database called `locomotive-sequelize-boilerplate.db`
in the current directory. This is just a test database, remove it and it will be re-created when you start the Locomotive
server again.

## How to use

First, clone this repository:
```shell
git clone git@github.com:robertklep/locomotive-sequelize-boilerplate.git
```

Second, install dependencies:
```shell
cd locomotive-sequelize-boilerplate
npm install -l
```

Next, start the server:
```shell
./node_modules/locomotive/bin/lcm.js server
```

Or, if you have LocomotiveJS installed globally:
```shell
lcm server
```

Finally, point your browser to [http://localhost:3000](http://localhost:3000)!

