if (process.env.NODE_ENV !=="production"){
    require('dotenv').config();
}

const  mongoose  = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

const dbUrl = process.env.DB_URL
// const dbUrl='mongodb://127.0.0.1:27017/yelp-camp'

//'mongodb://127.0.0.1:27017/yelp-camp'

mongoose.connect(dbUrl)
    .then(()=>{
        console.log('Mongo connection open')
    })
    .catch(err=>{
    console.log("oh no Mongo connection error!")
    console.log(err)
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for(let i=0; i<300; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:'6488788a9f3d75204beedcff',
            title: `${sample(descriptors)} ${sample(places)}`,
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sapiente est, quisquam quia at cupiditate veritatis animi, minima, voluptates ipsam illo libero voluptate debitis ipsum laborum? Alias nisi eius ducimus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
            {
                url: 'https://res.cloudinary.com/dbfayalcf/image/upload/v1687416175/YelpCamp/pkzkyn19lljw3iwaud1u.jpg',
                filename: 'YelpCamp/pkzkyn19lljw3iwaud1u',
                
              },
              {
                url: 'https://res.cloudinary.com/dbfayalcf/image/upload/v1687416175/YelpCamp/dq8b8lnp6jgbcu2koh9j.jpg',
                filename: 'YelpCamp/dq8b8lnp6jgbcu2koh9j',
                
              },
              {
                url: 'https://res.cloudinary.com/dbfayalcf/image/upload/v1687416175/YelpCamp/fcizqkvoa5o0vuooinnz.jpg',
                filename: 'YelpCamp/fcizqkvoa5o0vuooinnz',
                
              } 
            ]
        })
        await camp.save(); 
    }
    // const c = new Campground({title: 'purple field'});
    // await c.save();
};

seedDB().then(() => {
    mongoose.connection.close();
})