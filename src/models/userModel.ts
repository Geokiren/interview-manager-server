import { Schema, model } from 'mongoose';

interface userInterface {
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  password: string
}

const userSchema = new Schema<userInterface>({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default model('User', userSchema);