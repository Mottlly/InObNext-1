/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("InObscurum");

// Run a count command to count all documents in InOb
const entriesCount = db.getCollection("InOb").countDocuments();
console.log(entriesCount);

use("InObscurum");

// Run a find command to show all documents in InOb
const cursor = db.getCollection("InOb").find({});
console.log(cursor);

// Run a find command to log a specific document
use("InObscurum");

const specific = db.getCollection("InOb").findOne({ id: 1 });
console.log(specific);

//COMPARISON/////////////////////////////////////////////////////////////////
//$eq
//Matches values that are equal to a specified value.

use("InObscurum");

const eq = db.getCollection("InOb").find({
  id: { $eq: 2 },
});
console.log(eq);

//$gt
//Matches values that are greater than a specified value.

use("InObscurum");

const gt = db.getCollection("InOb").find({
  id: { $gt: 0 },
});
console.log(gt);

//$gte
//Matches values that are greater than or equal to a specified value.

use("InObscurum");

const gte = db.getCollection("InOb").find({
  id: { $gte: 1 },
});
console.log(gte);

//$in
//Matches any of the values specified in an array.

use("InObscurum");

const begin = db.getCollection("InOb").find({
  // matches 1 OR 2
  id: { $in: [1, 2] },
});
console.log(begin);

//$lt
//Matches values that are less than a specified value.

//$lte
//Matches values that are less than or equal to a specified value.

//$ne
//Matches all values that are not equal to a specified value.

//$nin
//Matches none of the values specified in an array.
