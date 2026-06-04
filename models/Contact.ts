import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  phone: string;
  propertyType: string;
  createdAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  propertyType: {
    type: String,
    required: [true, "Property Type is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
