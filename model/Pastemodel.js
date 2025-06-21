import mongoose from 'mongoose';

const PasteSchema = new mongoose.Schema({
  title: String,
  content: String,
  Permissions: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth' },
  views: { type: Number, default: 0 }
}, { timestamps: true }); // ✅ This adds createdAt and updatedAt automatically


const Paste = mongoose.model('Paste', PasteSchema);
export default Paste;
