---
id: version-2.0.0-seeds
title: Seeds
original_id: seeds
---

Seeds allow you to populate database tables and collections with default data, sample data or test data.

## How it works

 Seeds work for both type of models: Sequelize and MongoDB.

 Population is perform at boot time base on the environment variable `NODE_ENV`.

If `NODE_ENV` is set to:

* **production**: Execute `populateBasicData()` function. This mode creates the database, if not exists, before populate it.
* **development**: Executes `populateBasicData()` function. This mode creates the database, if not exists, before populate it.
* **test**: It executes `populateBasicData()` then `testingMocking()`. This mode forces database destruction and reconstruction before populate it.
* **dev-clean**: Special model intended to help you improve your development experience. It executes `populateBasicData()` then `populateFakeData()`. This mode forces database destruction and reconstruction before populate it.

> Database sync have a direct impact on all above modes. If sync is disabled the database structure is not affected at all. More details on [Database sync](migrations.md#database-sync).

## Structure

Seeds are stored in `src/data` folder. It consists of three scripts and one folder:

* `basicDataMocking.js`: Contains `populateBasicData()` function to populate with default data.
* `fakeDataMocking.js`: Contains `populateFakeData()` function to populate with fake data.
* `testingMocking.js`: Contains `testingMocking()` function to populate with testing data.
* `base`: Intended to help you organize your data sets.

The directory tree:

```
+-- src
|   +-- data
|   |   +-- base
|   |   +-- basicDataMocking.js
|   |   +-- fakeDataMocking.js
|   |   +-- testingDataMocking.js
```

## Recommendations

Below there is the list of current recommendations:

* Always check if data exists before insert new ones.
* Be cautious about **production** environment.

## Example

To illustrate how seeds works, lets continue with the *Animal* example shown in previous section: [Migrations, example](migrations.md#example). This time we are going to add 5 animals as default data.

Before start, remember that you need a working version of *Animal* example.

We are going to use the latest version of `animal` model:

```js
// file: src/entities/Animal/animal.model.js
import Sequelize from "sequelize";
import { ustart } from "ustart";

ustart.defineModel("postgres", "animal", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { type: Sequelize.STRING(10) },
  age: { type: Sequelize.INTEGER },
  category: { type: Sequelize.STRING(20) },
  size: { type: Sequelize.STRING(20) }
}, {
  timestamps: false
});
```

We need a script that holds the animals data. Let's name it `myAnimals.js`:
```
+-- src
|   +-- data
|   |   +-- base
|   |   |   +-- myAnimals.js
|   |   +-- basicDataMocking.js
|   |   +-- fakeDataMocking.js
|   |   +-- testingDataMocking.js
```

Its content is:

```js
export const myAnimals = [
  { id: 1, name: "Charlie", age: 3, category: "Cat", size: "small" },
  { id: 2, name: "Milo", age: 1, category: "Mouse", size: "small" },
  { id: 3, name: "Teddy", age: 6, category: "Dog", size: "medium" },
  { id: 4, name: "Toby", age: 9, category: "Panda", size: "large" },
  { id: 5, name: "Ruby", age: 14, category: "Dog", size: "medium" }
];
```

Now, we have to import the data and add it into `populateBasicData()` function. Open `basicDataMocking.js` script and use the follow:

```js
import { ustart } from "ustart";
import { myAnimals } from "./base/myAnimals";

export async function populateBasicData() {
  const { animal } = ustart.models;

  let result = await animal.findAndCountAll();
  if (result.count === 0) {
    animal.bulkCreate(myAnimals);
  }
};
```

Start your app if you had not done it already. uStart automatically insert the data in your table as follow (shell output):

```shell
[nodemon] starting `node ./node_modules/ustart-scripts/dist/scripts/ustart-entry.js`
NODE_ENV: development
Server is running on http://localhost:4000
Executing (default): SELECT count(*) AS "count" FROM "animals" AS "animal";
Executing (default): SELECT "id", "name", "age", "category", "size" FROM "animals" AS "animal";
Executing (default): INSERT INTO "animals" ("id","name","age","category","size") VALUES (1,'Charlie',3,'Cat','small'),(2,'Milo',1,'Mouse','small'),(3,'Teddy',6,'Dog','medium'),(4,'Toby',9,'Panda','large'),(5,'Ruby',14,'Dog','medium') RETURNING *;
```

Now, let's query the database to see if our data is there:

![Query result of animals data](assets/seed-show-table-data.png)

If your result matches the image, congratulations then, you have done your first seed flow!.
