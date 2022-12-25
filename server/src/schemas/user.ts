import * as mongoose from 'mongoose';
import { UserInput } from '../__generated__/resolvers-types';

const UserSchema = new mongoose.Schema<UserInput>({
  email: String,
  username: String,
  password: String,
});

const UserModel = mongoose.model<UserInput>('User', UserSchema);

export default UserModel;
