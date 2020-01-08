const USER = 'api'
const AGENT = 'agent'
const ADMIN = 'admin'
export default {
  USER: {
    login: `${USER}/User/login`,
    upload: `${USER}/Util/upload`,
  },
  AGENT: {
    login: `${AGENT}/User/login`,
  },
  ADMIN: {
    login: `${ADMIN}/User/login`,
  },
}