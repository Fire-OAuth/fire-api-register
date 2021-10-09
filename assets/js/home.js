let user

let schemaBuilder = lf.schema.create("userData", 1)
let transactionSchemaBuilder = lf.schema.create("transactionData", 2)

schemaBuilder
    .createTable("User")
    .addColumn("id", lf.Type.INTEGER)
    .addColumn("_id", lf.Type.STRING)
    .addColumn("email", lf.Type.STRING)
    .addColumn("firstName", lf.Type.STRING)
    .addColumn("lastName", lf.Type.STRING)
    .addColumn("profilePic", lf.Type.STRING)
    .addPrimaryKey(["id"], true);

transactionSchemaBuilder
    .createTable("Transactions")
    .addColumn("id", lf.Type.INTEGER)
    .addColumn("token", lf.Type.STRING)
    .addColumn("url", lf.Type.STRING)
    .addColumn("time", lf.Type.STRING)
    .addColumn("method", lf.Type.STRING)
    .addPrimaryKey(["id"], true);

let userDb
let item

let transactionDb
let transaction

schemaBuilder.connect().then(async (db) => {
    userDb = db;
    item = db.getSchema().table("User")
    user = await getUserDetails()
    if(user != undefined) {
        console.log(user)
        document.querySelector(".userCard").innerHTML = returnUserCard(user)
        document.querySelector(".loading").remove()
    }
    else {
        // userDb.delete().from(item).exec() // Clear session or Logout Query
        window.location.href = "/login.html"
    }
})

async function createItem(data) {
	let row = item.createRow(data)
	return await userDb.insertOrReplace().into(item).values([row]).exec().catch(err => console.log(err))
}

function getUserDetails() {
    return new Promise((resolve, reject) => {
        let user;
        userDb
		.select()
		.from(item)
		.exec()
        .then(res => {
            user = res.at(-1);
            resolve(user)
        })
    })
}

async function getTransactions() {
    return new Promise((resolve, reject) => {
        transactionDb
		.select()
		.from(transaction)
		.exec()
        .then(res => {
            resolve (res)
        })
    })
}
