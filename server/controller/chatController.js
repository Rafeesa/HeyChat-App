const router = require("express").Router();
const Chat = require("../models/chat");
const authMiddleware = require("./../middlewares/authMiddleware");
router.post("/create-new-chat", authMiddleware, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();
     await savedChat.populate('members');
    res.status(201).send({
      message: "chat created successfully",
      success: true,
      data: savedChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/get-all-chat", authMiddleware, async (req, res) => {
  try {
    const userid = req.userId;
    const allChat = await Chat.find({
      members: { $in: [userid] },
    }).populate('members')
      .sort({ updatedAt: -1 });

    res.status(201).send({
      message: "All chat Fetched successfully",
      success: true,
      data: allChat,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});
module.exports = router;
