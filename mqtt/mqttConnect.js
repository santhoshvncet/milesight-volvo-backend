import mqtt from "mqtt";
import mongoose from "mongoose";


const mongoURI = 'mongodb+srv://Santhosh:Sandy1234@cluster0.93lh7ek.mongodb.net/volvo';

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ====== Mongoose Schema ======
const sensorSchema = new mongoose.Schema({
  sensorId: String,
  inCount: Number,
  outCount: Number,
  capacity: Number,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", sensorSchema);


const brokerUrl = "mqtt://192.168.1.181"; 
const topic = "/milesight/peoplecount/device2";

const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe(topic, (err) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.log(`Subscribed to topic: ${topic}`);
    }
  });
});


client.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Message received on:", topic);
    console.log("Payload:", data);

   
    const sensorId = data.device_info?.device_sn || "unknown";
    const inCount = data.line_trigger_data?.[0]?.in || 0;
    const outCount = data.line_trigger_data?.[0]?.out || 0;

   
    const capacity = inCount - outCount;

    const newEntry = new SensorData({
      sensorId,
      inCount,
      outCount,
      capacity,
    });

    await newEntry.save();
    console.log("Data saved to MongoDB");

  } catch (err) {
    console.error("Error processing MQTT message:", err.message);
  }
});
