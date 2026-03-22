<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { isLogin, isLoading, form, errors, handleSubmit, toggleMode } = useAuth()
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen w-full bg-zinc-50 p-4">
    <div class="w-full flex items-start gap-2 max-w-md mb-4 py-2 px-4 bg-amber-100 border border-amber-300 text-amber-800 rounded-xl">
      <div class="flex items-start justify-center h-20 w-20">
        <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z" fill="#b45309"></path> <path d="M12 13.75C11.59 13.75 11.25 13.41 11.25 13V7.75C11.25 7.34 11.59 7 12 7C12.41 7 12.75 7.34 12.75 7.75V13C12.75 13.41 12.41 13.75 12 13.75Z" fill="#b45309"></path> <path d="M12 17.2499C11.87 17.2499 11.74 17.2198 11.62 17.1698C11.49 17.1198 11.39 17.0499 11.29 16.9599C11.2 16.8599 11.13 16.7499 11.07 16.6299C11.02 16.5099 11 16.3799 11 16.2499C11 15.9899 11.1 15.7298 11.29 15.5398C11.39 15.4498 11.49 15.3799 11.62 15.3299C11.99 15.1699 12.43 15.2598 12.71 15.5398C12.8 15.6398 12.87 15.7399 12.92 15.8699C12.97 15.9899 13 16.1199 13 16.2499C13 16.3799 12.97 16.5099 12.92 16.6299C12.87 16.7499 12.8 16.8599 12.71 16.9599C12.52 17.1499 12.27 17.2499 12 17.2499Z" fill="#b45309"></path> </g></svg>      </div>
      <div> 
        <h1 class="text-lg font-700">Backend is deployed on Free Hosting</h1>
        <p class="text-sm text-amber-700 font-medium">Please be patient, it may take a few seconds to load, or it may be offline, if you want to test it, please contact me on <a href="https://t.me/ysh2009uz" target="_blank" class="text-amber-900 underline">Telegram</a></p>
    </div>
    </div>
    <div class="card-base max-w-md w-full p-8 space-y-6">
      <div class="text-center">
        <h1 class="text-2xl font-800 text-zinc-900">
          {{ isLogin ? 'Welcome Back' : 'Create Account' }}
        </h1>
        <p class="text-sm text-zinc-500 mt-2">
          {{ isLogin ? 'Enter your details to access your tasks' : 'Start managing your projects today' }}
        </p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">        
        <div class="task-enter-active">
          <label class="block text-xs font-800 text-zinc-700 mb-1.5 uppercase tracking-wide">Username *</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="johndoe"
            class="input-base"
            :class="{ 'border-red-300 ring-2 ring-red-50': errors.username }"
          />
          <p v-if="errors.username" class="text-xs text-red-500 font-600 mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <label class="block text-xs font-800 text-zinc-700 mb-1.5 uppercase tracking-wide">Email Address *</label>
          <input
            v-model="form.email"
            v-if="!isLogin"
            type="email"
            placeholder="name@company.com"
            class="input-base"
            :class="{ 'border-red-300 ring-2 ring-red-50': errors.email }"
          />
          <p v-if="errors.email" class="text-xs text-red-500 font-600 mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-xs font-800 text-zinc-700 mb-1.5 uppercase tracking-wide">Password *</label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="input-base"
            :class="{ 'border-red-300 ring-2 ring-red-50': errors.password }"
          />
          <p v-if="errors.password" class="text-xs text-red-500 font-600 mt-1">{{ errors.password }}</p>
        </div>

         <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-50"
          >
            {{ isLoading ? 'Please wait…' : isLogin ? 'Sign In' : 'Create Account' }}
          </button>
      </form>

      <div class="text-center pt-2">
        <button 
          @click="toggleMode" 
          class="text-sm font-600 text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          {{ isLogin ? "Don't have an account? Register" : "Already have an account? Login" }}
        </button>
      </div>
    </div>

    <div class="fixed bottom-6 right-6 w-48">
      <div class="relative overflow-hidden rounded-xl bg-pink-50 border border-pink-200 p-2">
        <a href="https://github.com/shuhratyuldashev/Strawberry-Tasks-frontend" target="_blank" class="text-xs font-800 text-pink-400 uppercase tracking-tight">Open on GitHub</a>
      </div>
    </div>
  </div>
</template>