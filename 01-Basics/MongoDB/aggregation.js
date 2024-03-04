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
db.friends.aggregate([
  { $group: { _id: { age: "$age" }, allHobbies: { $push: "$hobbies" } } },
]);

// $unwind
db.friends.aggregate([{ $unwind: "$hobbies" }]);

// $addToSet
db.friends.aggregate([
  { $unwind: "$hobbies" },
  { $group: { _id: { age: "$age" }, allHobbies: { $addToSet: "$hobbies" } } },
]);

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

// Example: get the highest exam score of each person and then sort the results based on it
db.friends.aggregate([
  { $unwind: "$examScores" },
  { $project: { _id: 1, name: 1, score: "$examScores.score" } },
  {
    $sort: { score: -1 },
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      maxScore: { $max: "$score" },
    },
  },
  { $sort: { maxScore: -1 } },
]);

// Distribution Info
// $bucket
db.persons.aggregate([
  {
    $bucket: {
      groupBy: "$dob.age",
      boundaries: [0, 18, 30, 50, 80, 100],
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: "$dob.age" },
      },
    },
  },
]);

// $bucketAuto
db.persons.aggregate([
  {
    $bucketAuto: {
      groupBy: "$dob.age",
      buckets: 5,
      output: {
        numPersons: { $sum: 1 },
        averageAge: { $avg: "$dob.age" },
      },
    },
  },
]);

// Additional stages
db.persons.aggregate([
  { $match: { gender: "male" } },
  {
    $project: {
      _id: 0,
      name: { $concat: ["$name.title", " ", "$name.first", " ", "$name.last"] },
      birthDate: { $toDate: "$dob.date" },
    },
  },
  { $sort: { birthDate: 1 } },
  { $skip: 10 },
  { $limit: 10 },
]);

// $out   # to output the results to a new document
db.persons.aggregate([
  { $match: { gender: "male" } },
  {
    $project: {
      _id: 0,
      name: { $concat: ["$name.title", " ", "$name.first", " ", "$name.last"] },
      birthDate: { $toDate: "$dob.date" },
    },
  },
  { $sort: { birthDate: 1 } },
  { $skip: 10 },
  { $limit: 10 },
  { $out: "top10OldMen" },
]);

db.persons.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      gender: 1,
      email: 1,
      birthDate: { $toDate: "$dob.date" },
      age: "$dob.age",
      location: {
        type: "Point",
        coordinates: [
          {
            $convert: {
              input: "$location.coordinates.longitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
            },
          },
          {
            $convert: {
              input: "$location.coordinates.latitude",
              to: "double",
              onError: 0.0,
              onNull: 0.0,
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
      location: 1,
      birthDate: 1,
      age: 1,
      fullName: {
        $concat: [
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
  { $out: "transformedPersons" },
]);

// $geoNear       # note: it must be the first stage.
// Create a 2d or 2dsphere index
db.transformedPersons.createIndex({ location: "2dsphere" });

db.transformedPersons.aggregate([
  {
    $geoNear: {
      near: { type: "Point", coordinates: [-18.4, -42.8] },
      distanceField: "distanceCalculated",
      maxDistance: 1000000,
      query: { gender: "female" },
      includeLocs: "location",
      spherical: true,
    },
  },
  { $limit: 5 },
]);
