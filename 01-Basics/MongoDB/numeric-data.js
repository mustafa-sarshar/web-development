// NumberInt
db.numbers.insertOne({ num: NumberInt("10") });

// NumberLong
db.numbers.insertOne({ num: NumberLong("1213112323121233230") });

// Updating
db.numbers.updateOne(
  { _id: ObjectId("656e09ed25331f4677b0beaf") },
  { $inc: { num: NumberLong("20") } }
);

//  NumberDecimal
db.numbers.insertOne({ num: NumberDecimal("1.3") });
