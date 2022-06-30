const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.845tn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        const database = client.db('assignment-Collection');
        const users = database.collection('All-Users');
        const billing = database.collection('All-billing');

        // post and get users
        app.post('/api/registration', async (req, res) => {
            const user = req.body;
            const result = await users.insertOne(user);
         
            res.json(result);
        });

        // post and get users
        app.post('/api/add-billing', async (req, res) => {
            const user = req.body;
            // if (user?.search) {
            // const query = { $text: { FullName: user?.search } };
            // const data = await billing.find(query);
            //     {
            //     $text: [
            //         { FullName: { $regex: user?.search } },
            //         { Email: { $regex: user?.search } },
            //         { Phone: { $regex: user?.search } },
            //     ],
            // }

            // const value = data.toArray();
            // console.log(value);
            // }
            const result = await billing.insertOne(user);
            res.json(result);
        });

        app.get('/api/billing-list', async (req, res) => {
            const page = parseInt(req.query.page);

            let cursor = billing.find({});
            let result;
            if (page === 0) {
                result = await cursor.limit(10).sort({ _id: -1 }).toArray();
            } else if (page > 0) {
                result = await cursor
                    .skip((page - 1) * 10)
                    .limit(10)
                    .sort({ _id: -1 })
                    .toArray();
            }

            const count = await cursor.count();

            const cursor1 = billing.find({});
            const total = await cursor1.toArray();

            const data = total?.map((da) => da.PaidAmount);

            const value = data?.reduce(
                (pre, post) => parseInt(pre) + parseInt(post),
                0
            );

            res.send({
                result: result,
                count: count,
                total: value,
            });
        });

        app.get('/api/update-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await billing.findOne(query);
            res.json(result);
        });

        app.put('/api/update-billing/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            console.log(data);
            const query = { _id: ObjectId(id) };
            const updateDoc = { $set: data };
            const options = { upsert: true };
            const result = await billing.updateOne(query, updateDoc, options);
            res.json(result);
        });

        app.delete('/api/delete-billing/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await billing.deleteOne(query);
            res.json(result);
        });
    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('This is Programming hero assesment task');
});

app.listen(port, () => {
    console.log(`localhost started ${port}`);
});
