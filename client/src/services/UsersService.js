import axios from 'axios'

const baseURL = 'http://localhost:8080/api'

class Service {
  constructor() {
    this.client = axios.create({ baseURL })
  }

  addNewUser(user) {
    return this.client.post('/users', user)
  }
}

export const UsersService = new Service()
