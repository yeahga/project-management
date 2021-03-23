import mongoose, { Schema } from 'mongoose';

const DeveloperSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  position: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  projectId: { type: Schema.Types.ObjectId },
});

export const Developer = mongoose.model('developer', DeveloperSchema);
