import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    sensorId: {
    type: String,
    required: true,
  },
  inCount: {
    type: Number,
    required: true,
  },
  outCount: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})


export default mongoose.model("SensorData", dataSchema);