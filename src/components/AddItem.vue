<template>
    <div class="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-md">
        <h2 class="text-2xl font-bold mb-4">Agregar Elemento</h2>
        <form @submit.prevent="submitForm" class="space-y-6">
            <div>
                <label for="name" class="block text-sm font-medium text-gray-700">Nombre</label>
                <input id="name" type="text" v-model="name"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    placeholder="Escribe el nombre" required />
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
                <input id="description" type="text" v-model="description"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                    placeholder="Escribe la descripción" required />
            </div>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Agregar
            </button>
        </form>
    </div>
</template>

<script>
import { useCrudStore } from '../stores/crudStore';
import { ref } from 'vue';
import Swal from 'sweetalert2';

export default {
    setup() {
        const crudStore = useCrudStore();
        const name = ref('');
        const description = ref('');

        const submitForm = () => {
            if (!name.value || !description.value) {
                Swal.fire({
                    title: 'Error',
                    text: 'Por favor llena todos los campos.',
                    icon: 'error',
                });
                return;
            }
            crudStore.addItem({ name: name.value, description: description.value });
            name.value = '';
            description.value = '';
            Swal.fire({
                title: '¡Agregado!',
                text: 'El elemento se agregó correctamente.',
                icon: 'success',
            });
        };

        return {
            name,
            description,
            submitForm,
        };
    },
};
</script>