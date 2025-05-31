# Introduction

THis is a simple excercise for learning what a microservice is and how to build one using nodejs and ReactJS.

## What services are present?

1. Post: A service that allows users to add posts.
2. Comment: A service that allows users to add comments to posts.
3. Query: A service that allows users to query posts and comments.
4. Event-Bus: A service that is used internally to communicate between the services.
5. Moderation: A service that is used to moderate comments.

## What it don't do?

This is a simple exercise and so it don't include following features:

1. Authentication: There is no authentication in this exercise.
2. Authorization: There is no authorization in this exercise.
3. Database: There is no database in this exercise. All data is stored in memory.
4. Error handling: There is no serious error handling in this exercise.
5. Synchronization: There is no synchronization between services in the sense that if one service is down and starts later, it will not sync with the other services. This is a simple exercise and so it is not required. Only query service is made to sync with the event bus, as event bus stores all the events that are emitted by the other services.
6. Logging: There is no logging in this exercise.

## How to run the services?

1. Clone the repository.
2. Install the dependencies using `npm start download`.
3. Start the services using `npm start`.
4. Open the browser and go to `http://localhost:3000` to see the posts or make one.

## Important Points

1. Everytime you make a comment or post you need to refresh the page to see the changes.
2. The services are running on different ports, so you need to make sure that the ports are not blocked by any firewall or antivirus.
3. There is a moderation service that moderrates the comments. If a comment has word `orange` in it, it will be moderated and not shown in the comments section.
