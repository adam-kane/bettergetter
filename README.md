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
                
