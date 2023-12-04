// $project
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: ["$name.title", " ", "$name.first", " ", "$name.last"],
      },
    },
  },
]);

// string manipulation    $concat, $toUpper, $substrCP, $subtract, $strLenCP
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          { $toUpper: "$name.title" },
          " ",
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] },
            ],
          },

          " ",
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] },
            ],
          },
        ],
      },
    },
  },
]);

// $convert     # to Number - double
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0.0,
              onNull: "NA",
            },
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0.0,
              onNull: "NA",
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      gender: 1,
      email: 1,
      fullName: {
        $concat: [
          { $toUpper: "$name.title" },
          " ",
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] },
            ],
          },

          " ",
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] },
            ],
          },
        ],
      },
      location: 1,
    },
  },
]);

// $covert    # to Data
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      email: 1,
      birthDate: {
        $convert: {
          input: "$dob.date",
          to: "date",
        },
      },
      age: "$dob.age",
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0.0,
              onNull: "NA",
            },
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0.0,
              onNull: "NA",
            },
          },
        ],
      },
    },
  },
  {
    $project: {
      gender: 1,
      email: 1,
      birthDate: 1,
      age: 1,
      fullName: {
        $concat: [
          { $toUpper: "$name.title" },
          " ",
          { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
          {
            $substrCP: [
              "$name.first",
              1,
              { $subtract: [{ $strLenCP: "$name.first" }, 1] },
            ],
          },

          " ",
          { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
          {
            $substrCP: [
              "$name.last",
              1,
              { $subtract: [{ $strLenCP: "$name.last" }, 1] },
            ],
          },
        ],
      },
      location: 1,
    },
  },
]);

// $sort
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      birthDate: {
        $convert: {
          input: "$dob.date",
          to: "date",
        },
      },
    },
  },
  {
    $group: {
      _id: {
        birthYear: {
          $isoWeekYear: "$birthDate",
        },
      },
      numPersons: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      numPersons: -1,
    },
  },
]);

// $sort
db.persons.aggregate([
  {
    $project: {
      _id: 0,
      age: "$dob.age",
    },
  },
  {
    $group: {
      _id: {
        age: "$age",
      },
      numPersons: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      numPersons: -1,
    },
  },
]);

//  $push
db.friends
  .aggregate([
    { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
  ])
  .pretty();

// $unwind
db.friends.aggregate([{ $unwind: "$hobbies" }]).pretty();

// $addToSet
db.friends
  .aggregate([
    { $unwind: "$hobbies" },
    { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
  ])
  .pretty();

// $slice
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      examScore: { $slice: ["$examScores", 1, { $size: "$examScores" }] },
    },
  },
]);

// $size
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      numScores: { $size: "$examScores" },
    },
  },
]);

// $filter
db.friends.aggregate([
  {
    $project: {
      _id: 0,
      scores: {
        $filter: {
          input: "$examScores",
          as: "item",
          cond: { $gt: ["$$item.score", 60] },
        },
      },
    },
  },
]);
