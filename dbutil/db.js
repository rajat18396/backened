const mongoose = require(`mongoose`);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDb connection successful ${conn.connection.host}`)
  } catch(err) {
      console.log(`Error occured while connecting :${err.message}`)
  }
};

module.exports=connectDB;
