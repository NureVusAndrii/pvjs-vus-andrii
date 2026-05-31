<template>
  <div class="app">
    <header class="header">
      <RouterLink to="/" class="logo">Менеджер задач</RouterLink>

      <nav class="nav">
        <RouterLink to="/">Задачі</RouterLink>
        <RouterLink to="/stats">Статистика</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>