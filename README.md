# Schedules From Glen

The Schedules From Glen app is to allow instructors and event planners a quick and easy-to-use schedule building application that they can then share the schedule with students and event attendees.The user will be able to create new schedules using a drag and drop interface. Additionally, the user will be able to add more details to the schedule item such as relevant notes and urls. Upon completion of building the schedule, the user will have access to the schedule and older schedules with the ability to modify and delete schedules.

## Built With

React, Redux, Node, Express, PostgreSQL, React-Beautiful-DnD, Moment.js, Material-UI.

### Prerequisites

- [Node.js](https://nodejs.org/en/)

### Installing

Create your database and tables using the provided `data.sql` file. Start the server.

```
npm install
npm run server
```

Now that the server is running, open a new terminal tab with `cmd + t` and start the react client app.

```
npm run client
```

![Login page](/login.png)

![Manage Schedule page](/manage.png)

![Schedule Create page](/create.png)


- [x] Login
- [x] View Schedule
- [x] Delete schedule
- [x] Update Schedule
- [x] Nav Bar
- [x] Drag and Drop
- [x] Create Schedule
- [x] Create Schedule Item

### Next Steps

- [ ] Authorization
- [ ] Deploy to Heroku
- [ ] More Styling


## Authors

* Ian Carthey


## Acknowledgments

* Thank you to prime for the base passport set up
* Thank you to React-Beautiful-DnD library
