const express = require('express')
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  autoCreateGroupChat,
  fetchGroupChats,
} = require('../controllers/chatController')

const router = express.Router()

router.route('/').post(accessChat)
router.route('/').get(fetchChats)
router.route('/group').post(createGroupChat)
router.route('/rename').put(renameGroup)
router.route('/groupremove').put(removeFromGroup)
router.route('/groupadd').put(addToGroup)
router.route('/autocreate').post(autoCreateGroupChat)
router.route('/fetchGroupChats').get(fetchGroupChats)

module.exports = router
