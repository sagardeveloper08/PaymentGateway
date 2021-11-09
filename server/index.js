const express = require('express')
const cors = require('cors');
// stripe key
const stripe = require('stripe')("sk_test_51JtbWMSEkB7Tvcpf2OUWclZGaXkRPaRn2ZsobCwL7eFNnjpIkFx6HmjVuKRPE6IAVLIiIPVdt77i98AUe0x9KJFj0091FeT80i")
const uuid = require('uuid').v4
const app = express()


// middleware
app.use(express.json())
app.use(cors())

// routes
app.get("/", (req, res) => {
    res.send("its working properly")
})

app.post('/payments', (req, res) => {

    const { product, token } = req.body
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);

    const idempontencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount : product.price * 100,
            currency :"usd",
            customer : customer.id,
            receipt_email :token.email,
            description :"purchase of item",
            shippimng:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        }, { idempontencyKey })
    }).then(result => res.status(200).json(result)).catch(err => console.log(err))
})

// listen port
const PORT = 4000 
app.listen(PORT, () => console.log(`server is running on ${PORT}`))


