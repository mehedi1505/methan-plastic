const router = require('express').Router()
const agentControllers = require('../../../controllers/agentControllers')
const { authMiddleware } = require("../../../middlewares/authMiddleware")

router.post('/agent-add', authMiddleware, agentControllers.agent_add)
router.get('/get-agent', authMiddleware,agentControllers.agent_get)
router.get('/get-agent-by-id/:agentId', authMiddleware,agentControllers.get_agent_by_id)
router.post('/agent-update', authMiddleware,agentControllers.agent_update)
router.delete('/agent-delete/:agent_id', authMiddleware,agentControllers.agent_delete)


module.exports = router