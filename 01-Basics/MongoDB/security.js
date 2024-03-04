// use a database
use["database name"];

// create user
db.createUser({
  user: "testUser",
  pwd: "testPassword",
  roles: ["userAdminAnyDatabase"],
});
