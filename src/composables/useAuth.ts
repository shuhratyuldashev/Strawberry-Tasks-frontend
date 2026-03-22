// src/composables/useAuth.ts
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api, tokenStorage } from '@/api/axios'
import { useUserStore } from '@/store/userStore'

export function useAuth() {
  const router = useRouter()
  const userStore = useUserStore()

  const isLogin = ref(true)
  const isLoading = ref(false)

  const form = reactive({
    username: '',
    email: '',
    password: '',
  })

  const errors = reactive({
    username: '',
    email: '',
    password: '',
  })

  const clearErrors = () => {
    errors.username = ''
    errors.email = ''
    errors.password = ''
  }

  const toggleMode = () => {
    isLogin.value = !isLogin.value
    clearErrors()
  }

  const handleSubmit = async () => {
    clearErrors()
    isLoading.value = true

    try {
      let res;
      
      if (isLogin.value) {
        const response = await api.post('/login/', {
          username: form.username,
          password: form.password,
        })
        res = response.data
      } else {
        const response = await api.post('/register/', {
          username: form.username,
          email: form.email,
          password: form.password,
        })
        res = response.data
      }

      tokenStorage.setTokens(res.access, res.refresh)
      userStore.setUser(res)
      
      router.push('/')

    } catch (err: any) {
      const data = err?.response?.data
      console.error("Auth Error:", err)
      
      if (data) {
        if (data.username) errors.username = Array.isArray(data.username) ? data.username[0] : data.username
        if (data.email)    errors.email    = Array.isArray(data.email) ? data.email[0] : data.email
        if (data.password) errors.password = Array.isArray(data.password) ? data.password[0] : data.password
        
        if (data.detail)   errors.username = data.detail 
      }
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLogin,
    isLoading,
    form,
    errors,
    toggleMode,
    handleSubmit
  }
}