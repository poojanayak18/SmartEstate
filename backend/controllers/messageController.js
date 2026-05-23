const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  try {

    const { propertyId, receiverId, message } = req.body;

    const newMessage = new Message({
      property: propertyId,
      sender: req.user.id,
      receiver: receiverId,
      message
    });

    await newMessage.save();

    res.status(201).json({
      message: "Message sent",
      data: newMessage
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMessages = async (req, res) => {
  try {

    const { propertyId } = req.params;

    const messages = await Message.find({
      property: propertyId
    }).populate("sender", "name");

    res.json(messages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};