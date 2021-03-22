import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  managerId: { type: Schema.Types.ObjectId },
});

export const Project = mongoose.model('project', ProjectSchema);
