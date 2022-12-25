import * as mongoose from 'mongoose';
import { SignUpUserInput } from '../__generated__/resolvers-types';

const UserSchema = new mongoose.Schema<SignUpUserInput>({
  email: String,
  username: String,
  password: String,
});

const UserModel = mongoose.model<SignUpUserInput>('User', UserSchema);

export default UserModel;
