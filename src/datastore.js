const {Datastore} = require('@google-cloud/datastore');
const process = require('process');

console.log("gae", process.env.GOOGLE_APPLICATION_CREDENTIALS)
console.log("proj", process.env.GOOGLE_CLOUD_PROJECT)

const ds = new Datastore();

const entkey = ds.key('User');

ds.save({
    key: entkey,
    data: {
        email : "SDDAAASDAD"
    }
})