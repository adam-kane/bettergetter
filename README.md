# bettergetter

Repo for Habit Tracker COE project

## What is the application?

It is a habit/goal tracking application which aims to encourage users to form automatic behaviours by deliberately cultivating/eliminating regular actions. 
Users of the application should be able to keep track of goals and how frequently they complete these goals.
The user should have a good degree of customisation on goal frequency, overall commitment time period.
Users should be provided with visualisation of the progress of their goals.
 
## Why?

Experts on the subject of forming habits argue that the sum of many small daily behaviors is far more important than the occasional dramatic gesture. 
One of the most powerful ways to build new habits is to track when you do them. While you can use a wall calendar or a journal to record your habits, an app can be a more convenient solution.

## How?

A user will need to create and login to their account to have access to their personal workspace. When logged in a user can add goals that they wish to perform repeatedly over a period of time. 
The user should have to provide minimal info to create an account, email/password, possibly additionally with Google Oauth signup.

### When creating a habit/goal, the user needs:
- To select whether the goal is binary (did/did not complete) or quantifiable.

### For both category of habits:
- To provide a title/name for the habit
- To provide a frequency at which to complete the goal (every day, every x days, x times per month)
- To provide a reminder preference (no reminder, reminder at a certain time of day)
- Optionally to provide an start/end date for the habit
- Optionally to provide notes, this can be freeform text entry 

### For quantifiable habits:
- Provide a unit of measurement, this can be user generated so we don't need to create an exhaustive list of units 
- Provide a target value to meet this goal

After a user creates a habit to track, they will see it added to a list.
The user should be able to sort this list in a variety of orders (by name, created date, status (completed/ongoing), completion score etc)
From the list view the user should be able to easily see the recent completion status of their goals (perhaps in a weekly view) 
When tapping a habit item in the list the user should see a detailed view of the habit status. From this view they should see a complete history of their tracking with an easy to read overview broken down by week/month/year. Some additional visualisation should be provided with details on current streak/best streak, completion progress if the goal is quanitfiable.

As an additional dimension the application should also allow to track their mood on a daily basis potentially allowing for some rudimentary correlation statistics between a user's mood and their habits/behaviour on that day.
 
### MVP

- User account creation/login                                        
- Create habits                           
- Track completion of habits    
- Visualise completion data in habit detailed view 

### Stretch

- Add reminders
- Add mood tracking, display some basic visualisation on correlation of mood and success in adhering to habitutal behaviour
- Add motivational quotes to database to be randomly displayed throughout app

# ERD

<img width="924" alt="image" src="https://user-images.githubusercontent.com/31001296/201695568-2a6f9e18-e909-47f5-b3c9-39b0b6c287db.png">


# API SPEC

## Habits 

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) `GET users/{userId}/habits`
Return a list of all habits for a user

Response
```
[
  {
    "id": 1,
    "title": "Brush teeth"
  },
  {
    "id": 2,
    "title": "Run 2k"
  }
]
```

![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) `POST /users/{userId}/habits`
Create a new habit

Response
```
{
  "id": 3,
  "title": "Do the dishes"
}
```

![#eda11c](https://placehold.co/15x15/eda11c/eda11c.png) `PUT /users/{userId}/habits/{habitId}`
Update an existing habit

Response
```
{
  "id": 1,
  "title": "Brush teeth and floss!"
}
```

![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png) `DELETE /users/{userId}/habits/{habitId}`
Delete a habit

Response
204 HTTP Code

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) `GET /users/{userId}/habits/{habitId}`
Return a habit detail

Response
```
{
  "id": 1,
  "title": "Brush teeth",
  "completed_for_today": false,
  "completions": [
    { "id": 1, "time_of_day": 1667749503 },
    { "id": 2, "time_of_day": 1667749502 },
    { "id": 3, "time_of_day": 1663449503 }
  ],
  "reminders": [
   {
     "id": 1,
     "time_of_day": 1667749503
   }
}
```

## Habit completions 

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) `GET /users/{userId}/habit/{habitId}/completions`
Return all completions for a habit

Response
```
[
    { "id": 1, "time_of_day": 1667749503 },
    { "id": 2, "time_of_day": 1667749502 },
    { "id": 3, "time_of_day": 1663449504 },
    { "id": 4, "time_of_day": 1667749505 },
    { "id": 5, "time_of_day": 1667749506 },
    { "id": 6, "time_of_day": 1663449507 },
    { "id": 7, "time_of_day": 1667749508 },
    { "id": 8, "time_of_day": 1667749509 },
    { "id": 9, "time_of_day": 1663449511 }
]
```

![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) `POST /users/{userId}/habits/{habitId}/completions`
Create a new habit completion

Response
```
{
  "id": 1,
  "time_of_day": 1667749503
}
```

![#eda11c](https://placehold.co/15x15/eda11c/eda11c.png) `PUT /users/{userId}/habits/{habitId}/completions{completionId}`
Update an existing habit completion

Response
```
{
  "id": 1,
  "time_of_day": 1667749545
}
```

![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png) `DELETE /users/{userId}/habits/{habitId}/completions/{completionId}`
Delete a habit completion

Response
204 HTTP 

## Habit reminders

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) `GET users/{userId}/habit/{habitId}/reminders`
Return reminders for a habit

Response
```
[
    { "id": 1, "time_of_day": 1667749503 },
    { "id": 2, "time_of_day": 1667749502 }
]
```

![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) `POST /users/{userId}/habits/reminders`
Create a new habit reminder

Response
```
{
  "id": 1,
  "time_of_day": 1667749503
}
```

![#eda11c](https://placehold.co/15x15/eda11c/eda11c.png) `PUT /users/{userId}/habits/{habitId}/reminders{reminderId}`
Update an existing habit reminder

Response
```
{
  "id": 1,
  "time_of_day": 1667749545
}
```

![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png) `DELETE /users/{userId}/habits/{habitId}/reminders/{reminderId}`
Delete a habit reminder

Response
204 HTTP 

## Users

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) `GET users/{userId}`
Return a user

Response
```
{
  "id": 1,
  "username": "a_user",
  "enabled": true
}
```

![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) `POST /users`
Create a new user

Response
```
{
  "id": 1,
  "username": "a_user",
  "enabled": true
}
```

![#eda11c](https://placehold.co/15x15/eda11c/eda11c.png) `PUT /users/{userId}`
Update a user

Response
```
{
  "id": 1,
  "username": "b_user",
  "enabled": true
}
```

![#f03c15](https://placehold.co/15x15/f03c15/f03c15.png) `DELETE /users/{userId}`
Delete a user

204 HTTP Code

## User moods

![#1589F0](https://placehold.co/15x15/1589F0/1589F0.png) `GET users/{userId}/moods`
Return a user's mood entries

Response
```
[
    { "id": 1, "time_of_day": 1667749503, "Happy" },
    { "id": 2, "time_of_day": 1667749502, "Sad" }
]
```

![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) `POST /users/{userId}/moods`
Create a new user mood entry

Response
```
{ "id": 1, "time_of_day": 1667749503, "Happy" }
```
                
