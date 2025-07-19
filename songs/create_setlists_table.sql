create table setlists (
  id serial primary key,
  date date,
  venue text,
  city text,
  set text,
  song text,
  is_encore boolean
); 