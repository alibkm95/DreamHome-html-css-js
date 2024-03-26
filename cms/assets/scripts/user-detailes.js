import {
  GetUrlParams,
  RedirectTo,
  RenderUserInfos,
  ChangeUserRole,
  UserBlockingManager,
  DeleteUser,
} from "./functions/functions.js"

window.ChangeUserRole = ChangeUserRole
window.UserBlockingManager = UserBlockingManager
window.DeleteUser = DeleteUser

window.addEventListener('load', async () => {

  const userID = GetUrlParams('user')

  if (!userID) {
    return RedirectTo('./users.html')
  }

  await RenderUserInfos(userID)

})