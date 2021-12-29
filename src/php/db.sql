-- auto-generated definition
create table data
(
    sid                  int auto_increment
        primary key,
    UserId               text not null,
    Scores               int  not null,
    PlayTime             int  not null,
    `Use Skills`         int  not null,
    `Total Fruits`       int  not null,
    `Total Bad Fruits`   int  not null,
    `Total Achievements` int  not null,
    `Total Medals`       int  not null,
    `Difficulty Levels`  int  not null
);

