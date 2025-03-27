import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  image: String,
  role: { type: String, default: 'user' },
  vaults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vault' }]
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

