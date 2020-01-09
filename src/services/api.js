const USER = 'api'
const AGENT = 'agent'
const ADMIN = 'admin'
export default {
  USER: {
    login: `${USER}/user/login`,
    upload: `${USER}/util/upload`,
  },
  AGENT: {
    login: `${AGENT}/user/login`,
  },
  ADMIN: {
    login: `${ADMIN}/user/login`,
  },
}