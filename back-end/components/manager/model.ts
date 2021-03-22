import mongoose, { Schema } from 'mongoose';

const ManagerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export const Manager = mongoose.model('manager', ManagerSchema);
