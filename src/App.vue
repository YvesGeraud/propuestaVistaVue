<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-blue-600 text-white p-4 text-center">
      <h1 class="text-3xl font-bold">Gestión de Elementos</h1>
    </header>
    <main class="container mx-auto py-6">
      <!-- Lista de Elementos -->
      <ListItems />

      <!-- Formulario para Agregar Elementos -->
      <AddItem />
    </main>
    <footer class="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2024 Mi Aplicación</p>
    </footer>
  </div>
</template>

<script>
import ListItems from './components/ListItems.vue';
import AddItem from './components/AddItem.vue';

export default {
  components: {
    ListItems,
    AddItem,
  },
};
</script>

<style>
/* Opcional: Estilos adicionales para el diseño general */
</style>
