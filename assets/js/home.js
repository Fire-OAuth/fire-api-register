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

        let html = await getAPIArrayHtml(user)
        document.querySelector(".allApiContainer").innerHTML = html
    }
    else {
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

async function getAPIArrayHtml (user) {
    const FIRE_GET_ENDPOINT = "http://localhost:3003/api/apis/data"
    let id = user._id

    let response = await fetch(`${FIRE_GET_ENDPOINT}/${id}`)

    let data = await response.json()
    let html = ""
    data.forEach(element => {
        html += returnAPICard(element)
    })

    return html
} 
