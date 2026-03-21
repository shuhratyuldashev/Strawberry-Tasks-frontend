<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, useRouter, useRoute } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'
import { checkAuth, startAutoRefresh, stopAutoRefresh } from './api/auth'
import { useUserStore } from './store/userStore'

const router   = useRouter()
const route    = useRoute()
const authStore = useUserStore()

onMounted(async () => {
  const { data, success } = await checkAuth()

  if (success) {
    authStore.setUser(data)
    startAutoRefresh()
    if (route.path === '/auth') {
      router.replace('/')
    }
  } else {
    if (route.path !== '/auth') {
      router.replace('/auth')
    }
  }
})

onBeforeUnmount(() => {
  stopAutoRefresh()
})
</script>