const Router = require("express")
const router = new Router()
const UserControler = require("../controlers/controlers.user")

router.post("/user", UserControler.createUser)
router.put("/user", UserControler.updateUser)
router.get("/user", UserControler.getUsers)
router.get("/user/:id", UserControler.getOneUser) 
router.delete("/user/:id", UserControler.deleteUser)






module.exports = router
