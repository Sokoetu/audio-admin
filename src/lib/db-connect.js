import mongoose from 'mongoose';
// get mongo uri
let MONGODB_URI = process.env.MONGODB_URI;
MONGODB_URI += `/${process.env.DB_NAME}?retryWrites=true&w=majority`;
MONGODB_URI = MONGODB_URI.replace ('<password>', process.env.DB_PASSWORD);

if (!MONGODB_URI) {
  throw new Error (
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose || null;

if (!cached) {
  cached = global.mongoose = {conn: null, promise: null};
}

async function db () {
  if (cached.conn) {
    return cached.conn;
  }

  cached = await mongoose.connect (MONGODB_URI)
   
  return cached.conn;
}

// handle db connection
const connect = async () => {
  try {
    await db()
    return true;
  } catch (err) {
    return false;
  }
};

export default connect;
