const Messages = require('../models/messageModel')

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message, time, name } = req.body
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
      time: time,
      name: name,
    })
    if (data) return res.json({ msg: 'Message added successfully.' })
    return res.json({ msg: 'Failed to add message to the database.' })
  } catch (ex) {
    next(ex)
  }
}

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body
    const messages = await Messages.find({
      users: {
        $all: [to],
      },
    }).sort({ updatedAt: 1 })
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        time: msg.time,
        name: msg.name,
      }
    })
    res.json(projectMessages)
  } catch (ex) {
    next(ex)
  }
}
