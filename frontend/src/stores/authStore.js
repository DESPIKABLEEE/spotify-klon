import { makeAutoObservable } from 'mobx'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:6970'

class AuthStore {
  user = null
  token = null
  loading = false
  error = null
  message = null
  loginForm = {
    identifier: '',
    password: ''
  }
  registerForm = {
    email: '',
    password: ''
  }

  constructor() {
    makeAutoObservable(this)
    this.hydrateSession()
  }

  resetFeedback() {
    this.error = null
    this.message = null
  }

  hydrateSession() {
    try {
      const storedToken = localStorage.getItem('auth.token')
      const storedUser = localStorage.getItem('auth.user')
      if (storedToken && storedUser) {
        this.user = JSON.parse(storedUser)
        this.token = storedToken
      }
    } catch {
      // ignore
    }
  }

  setLoginField(field, value) {
    this.loginForm[field] = value
  }

  setRegisterField(field, value) {
    this.registerForm[field] = value
  }

  clearForms() {
    this.loginForm = { identifier: '', password: '' }
    this.registerForm = { email: '', password: '' }
  }

  setSession(user, token) {
    this.user = user
    this.token = token
    localStorage.setItem('auth.token', token)
    localStorage.setItem('auth.user', JSON.stringify(user))
  }

  clearSession() {
    this.user = null
    this.token = null
    localStorage.removeItem('auth.token')
    localStorage.removeItem('auth.user')
  }

  async login() {
    this.loading = true
    this.resetFeedback()
    try {
      const response = await fetch(`${API_BASE}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.loginForm.identifier,
          password: this.loginForm.password
        })
      })

      if (!response.ok) {
        const { message } = await response.json().catch(() => ({ message: 'Login failed' }))
        throw new Error(message || 'Login failed')
      }

  const data = await response.json()
  this.setSession(data.user, data.token)
      this.message = 'Successfully logged in'
      this.clearForms()
      return data.user
    } catch (error) {
      this.error = error.message || 'Login failed'
      throw error
    } finally {
      this.loading = false
    }
  }

  async register() {
    this.loading = true
    this.resetFeedback()
    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.registerForm.email,
          password: this.registerForm.password
        })
      })

      if (!response.ok) {
        const { message } = await response.json().catch(() => ({ message: 'Registration failed' }))
        throw new Error(message || 'Registration failed')
      }

  const data = await response.json()
  this.setSession(data.user, data.token)
  this.message = 'Account created successfully'
  this.clearForms()
  return data.user
    } catch (error) {
      this.error = error.message || 'Registration failed'
      throw error
    } finally {
      this.loading = false
    }
  }
}

export default new AuthStore()
