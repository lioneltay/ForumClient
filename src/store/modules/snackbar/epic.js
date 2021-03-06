import { combineEpics } from "redux-observable"
import { OPEN_SNACKBAR, CLOSE_SNACKBAR, openSnackbar } from "./actions"
import { LOGIN, SIGNUP, LOGOUT } from "store/modules/auth/actions"
import * as R from "ramda"

const autoCloseEpic = action$ =>
  action$
    .ofType(OPEN_SNACKBAR)
    .delay(3000)
    .mapTo({ type: CLOSE_SNACKBAR })

const loginEpic = action$ =>
  action$
    .ofType(LOGIN.SUCCESS, SIGNUP.SUCCESS)
    .map(action => {
      const first_name = R.path(["payload", "user", "first_name"], action)
      return `Hi, ${first_name}`
    })
    .merge(action$.ofType(LOGOUT.SUCCESS).mapTo(`Logged out`))
    .map(message => openSnackbar({ message }))

export default combineEpics(autoCloseEpic, loginEpic)
