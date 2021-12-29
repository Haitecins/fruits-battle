<?php
function conn(): PDO
{
  $host = 'localhost';
  $user = 'root';
  $password = '';
  $dbname = 'fw';

  $dsn = 'mysql:dbname=' . $dbname . ';host=' . $host;
  return new PDO($dsn, $user, $password);
}