<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
    <div class="text-center">
      <div class="relative inline-block">
        <h1 class="text-[12rem] font-900 text-zinc-200 leading-none">404</h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-2xl font-800 text-zinc-900 bg-white px-4 py-2 rounded-2xl shadow-soft border border-zinc-100">
            Page Not Found
          </span>
        </div>
      </div>

      <div class="mt-8 space-y-4">
        <h2 class="text-2xl font-800 text-zinc-900">Упс! Кажется, вы потерялись.</h2>
        <p class="text-zinc-500 max-w-sm mx-auto font-500">
          Страница, которую вы ищете, не существует или была перемещена в другой раздел.
        </p>
      </div>

      <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          @click="$router.back()" 
          class="btn-outline w-full sm:w-auto px-8"
        >
          Назад
        </button>
        
        <RouterLink 
          to="/" 
          class="btn-primary w-full sm:w-auto px-8 justify-center"
        >
          На главную
        </RouterLink>
      </div>
      
      <div class="mt-20 opacity-20 grayscale">
         <div class="h-1 w-24 bg-gradient-to-r from-transparent via-pink-500 to-transparent mx-auto"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Дополнительная анимация для "мягкого" появления */
div {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>