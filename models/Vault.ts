import mongoose from 'mongoose';
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