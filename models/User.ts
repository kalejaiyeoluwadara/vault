// src/models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  role: { type: String, default: 'user' },
  vaults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vault' }]
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

// src/models/Vault.ts
const VaultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    type: { type: String, enum: ['text', 'image', 'document'] },
    content: String,
    name: String,
    sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  }],
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export const Vault = mongoose.models.Vault || mongoose.model('Vault', VaultSchema);