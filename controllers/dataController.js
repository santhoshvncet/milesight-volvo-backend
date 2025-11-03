import SensorData from '../models/dataFromSensor.js';

export const getAllData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({Timestamp : -1});
    res.status(200).json({
       message : "get all data",
       count : data.length(),
       data
    })
    // return res.json({
    //   success: true,
    //   inCount: "",
    //   outCount: "",
    //   capacity: ""
    // })

  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "internal error while fetching data"
    })
  }
}


export const getInData = async (req, res) => {
  try {
    const data = await SensorData.find({}, { sensorId: 1, inCount: 1, timestamp: 1, _id: 0 }).sort({ timestamp: -1 });
    return res.status(200).json({
      success: true,
      message: "In-count data fetched successfully",
      count: data.length,
      data,
      date:Date.now
    });

    // res.status(200).json({
    //   success: true,
    //   sensorId: "1",
    //   inCount: 1
    // })
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "internal error while fetching data"
    })

  }
}


export const getOutData = async (req, res) => {
  try {
    const data = await SensorData.find({}, { sensorId: 1, outCount: 1, timestamp: 1, _id: 0 }).sort({ timestamp: -1 });
    return res.status(200).json({
      success: true,
      message: "Out-count data fetched successfully",
      count: data.length,
      data,
    });

    // res.status(200).json({
    //   success: true,
    //   sensorId: "1",
    //   outCount: "2"
    // })
  } catch (error) {
    res.status(500).json({ success: false, message: "internal error while fetching data", error });
  }
}

export const getCapacityData = async (req, res) => {
  try {
    const data = await SensorData.find({}, { sensorId: 1, capacity: 1, timestamp: 1, _id: 0 }).sort({ timestamp: -1 });
    return res.status(200).json({
      success: true,
      message: "Capacity data fetched successfully",
      count: data.length,
      data,
    });
    // const data = await SensorData.find({ sensorId });
    // res.status(200).json({
    //   data,
    //   capacityData: "3"
    // })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}