require("dotenv").config();

const { MongoClient } = require("mongodb");
const mongodbURI = process.env.MONGODB_URI;

const mongoClient = new MongoClient(mongodbURI);
const dbName = "main";
const collectionName1 = "users";
const collectionName2 = "posts";

const listDatabases = async (client) => {
  databaseList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
  console.log("\n");
};

const connectToDatabase = async (client) => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Connection ");
  }
};

const insertDocument = async (collection, insertData, session) => {
  try {
    const result = await collection.insertOne(insertData, { session });
    console.log(
      "Document inserted:",
      session && session["id"] ? `Session: ${session["id"]["id"].toUUID()}` : ""
    );
    console.log(result);
    console.log("\n");

    return { result, session };
  } catch (err) {
    console.error(`Insertion Error: ${err} \n`);
  }
};

const findDocument = async (collection, searchQuery, session) => {
  try {
    const result = await collection.findOne(searchQuery, { session });
    console.log(
      "Document found:",
      session && session["id"] ? `Session: ${session["id"]["id"].toUUID()}` : ""
    );
    console.log(result);
    console.log("\n");

    return { result, session };
  } catch (err) {
    console.error(`Search Error: ${err} \n`);
  }
};

const updateDocument = async (
  collection,
  searchQuery,
  updateQuery,
  session
) => {
  try {
    const result = await collection.updateOne(searchQuery, updateQuery, {
      session,
    });
    console.log(
      "Document updated:",
      session && session["id"] ? `Session: ${session["id"]["id"].toUUID()}` : ""
    );
    console.log(result);
    console.log("\n");

    return { result, session };
  } catch (err) {
    console.error(`Update Error: ${err} \n`);
  }
};

const deleteDocument = async (collection, searchQuery, session) => {
  try {
    const result = await collection.deleteOne(searchQuery, { session });
    console.log(
      "Document deleted:",
      session && session["id"] ? `Session: ${session["id"]["id"].toUUID()}` : ""
    );
    console.log(result);
    console.log("\n");

    return { result, session };
  } catch (err) {
    console.error(`Deletion Error: ${err} \n`);
  }
};

const runTransaction1 = async (collections) => {
  let session;
  const { collectionUsers, collectionPosts } = collections;
  // Optional. Define options to use for the transaction
  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  try {
    // Start the client session
    session = mongoClient.startSession();

    const transactionResults = await session.withTransaction(async () => {
      // Operations will go here

      // Step 1: Find the User
      const userToFind = { username: "userNew1" };
      //   const { result: userFound, session: session1 } = await findDocument(
      //     collectionUsers,
      //     userToFind,
      //     session
      //   );
      // session = session1;

      const userFound = await collectionUsers.findOne(userToFind, { session });

      if (!userFound) {
        throw new Error("User not found!");
      }

      // Step 2: Create a new Post
      const postNew = {
        title: "Post 14 new",
        content: "asdasd fhgjhgjgjghj ghj",
        author: "Author new",
        creator: userFound._id,
        category: "Health Science",
        visibility: "Public",
        sourceUrl: "http://yahoo.com",
      };
      // const { result: postInserted, session: session2 } =
      //   await insertDocument(collectionPosts, postNew, session);
      // session = session2;

      const postInsertResult = await collectionPosts.insertOne(postNew, {
        session,
      });

      if (!postInsertResult) {
        throw new Error("Insertion not successful!");
      }

      // Step 3: Update the User's posts
      //   const { result: userUpdated, session: session3 } =
      //     await updateDocument(
      //       collectionUsers,
      //       { username: userFound.username },
      //       {  $addToSet: { posts: postNew._id } },
      //       session
      //     );
      //   session = session3;

      const userUpdatedResult = await collectionUsers.updateOne(
        { username: userFound.username },
        { $addToSet: { posts: postInsertResult.insertedId } },
        { session }
      );

      if (!userUpdatedResult) {
        throw new Error("Update not successful!");
      }
    }, transactionOptions);

    if (transactionResults) {
      console.log("Transaction completed successfully.");
    } else {
      console.warn("Transaction failed.");
    }
  } catch (err) {
    console.error(`Transaction Error: ${err} \n`);
  } finally {
    session.endSession();
  }
};

const main = async () => {
  try {
    await connectToDatabase(mongoClient);
    await listDatabases(mongoClient);

    // Retrieve the target collection, Users
    const collectionUsers = mongoClient.db(dbName).collection(collectionName1);
    const collectionPosts = mongoClient.db(dbName).collection(collectionName2);

    // Define a new document, and add it to the database.
    const userNew = {
      username: "userNew2",
      email: "userNew2@mail.com",
      password: "userNew2@123@ABC",
      avatar: "1__2.png",
    };
    await insertDocument(collectionUsers, userNew);

    // Find a document, a User
    const userToFind = { username: "userNew2" };
    await findDocument(collectionUsers, userToFind);

    // Update a document, a User by a new avatar
    const userToUpdate = { userNew: "userNew1" };
    const dataToUpdate = { $set: { avatar: "2__1.png" } };
    await updateDocument(collectionUsers, userToUpdate, dataToUpdate);

    // Delete a document, a User
    const userToDelete = { username: "userNew2" };
    await deleteDocument(collectionUsers, userToDelete);

    // Use MongoDB Transactions
    await runTransaction1({ collectionUsers, collectionPosts });
  } catch (err) {
    console.error(err);
  } finally {
    await mongoClient.close();
  }
};

// Run the server
main();
