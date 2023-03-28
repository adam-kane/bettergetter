create table if not exists "user"
(
    id serial not null
        constraint user_pkey primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar (255) not null,
    password varchar (255) not null
);

create table if not exists "habit"
(
    id serial not null
        constraint habit_pkey primary key,
    title varchar(255) not null,
    notes varchar(255),
    completions_required_per_day int not null,
    user_id integer
        constraint habit_user_id_fkey references "user" ON DELETE CASCADE
);

create table if not exists "reminder"
(
    id serial not null
        constraint reminder_pkey primary key,
    time_of_day date not null,
    habit_id integer
        constraint reminder_habit_id_fkey references "habit" ON DELETE CASCADE
);

create table if not exists "habit_completion"
(
    id serial not null
        constraint habit_completion_pkey primary key,
    time_of_day date not null,
    habit_id integer
        constraint habit_completion_habit_id_fkey references "habit" ON DELETE CASCADE
);

create table if not exists "mood"
(
    id serial not null
        constraint mood_pkey primary key,
    title varchar(255) not null
);

create table if not exists "user_mood"
(
    id serial not null
        constraint user_mood_pkey primary key,
    user_id integer not null
        constraint user_id_fkey references "user" ON DELETE CASCADE,
    mood_id integer not null
        constraint mood_id_fkey references "mood" ON DELETE CASCADE
);