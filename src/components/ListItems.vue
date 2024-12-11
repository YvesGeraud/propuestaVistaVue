<template>
    <div class="container mx-auto mt-8 p-6 bg-gray-100 shadow-lg rounded-md">
        <h2 class="text-3xl font-extrabold mb-6 text-center text-gray-800">Lista de Elementos</h2>
        <table class="table-auto w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
            <thead class="bg-blue-500 text-white">
                <tr>
                    <th class="border border-gray-300 px-4 py-2 text-left">ID</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Nombre</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Descripción</th>
                    <th class="border border-gray-300 px-4 py-2 text-left">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in crudStore.items" :key="item.id"
                    class="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-all">
                    <td class="border border-gray-300 px-4 py-2">{{ item.id }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ item.name }}</td>
                    <td class="border border-gray-300 px-4 py-2">{{ item.description }}</td>
                    <td class="border border-gray-300 px-4 py-2 flex justify-start space-x-3">
                        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md"
                            @click="startEdit(item)">
                            Editar
                        </button>
                        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md"
                            @click="confirmDelete(item.id)">
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Formulario Modal para Editar -->
        <div v-if="editingItem" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 class="text-xl font-bold mb-4">Editar Elemento</h3>
                <form @submit.prevent="submitEdit">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" v-model="editingItem.name"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                            required />
                    </div>
                    <div class="mt-4">
                        <label class="block text-sm font-medium text-gray-700">Descripción</label>
                        <input type="text" v-model="editingItem.description"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                            required />
                    </div>
                    <div class="flex justify-end space-x-4 mt-6">
                        <button type="button"
                            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                            @click="cancelEdit">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useCrudStore } from '../stores/crudStore';
import { reactive, ref } from 'vue';
import Swal from 'sweetalert2';

export default {
    setup() {
        const crudStore = useCrudStore();
        const editingItem = ref(null);

        const startEdit = (item) => {
            editingItem.value = { ...item };
        };

        const submitEdit = () => {
            const index = crudStore.items.findIndex((i) => i.id === editingItem.value.id);
            if (index !== -1) {
                crudStore.items[index] = editingItem.value;
                Swal.fire({
                    title: '¡Editado!',
                    text: 'El elemento se editó correctamente.',
                    icon: 'success',
                });
            }
            editingItem.value = null;
        };

        const cancelEdit = () => {
            editingItem.value = null;
        };

        const confirmDelete = async (id) => {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: 'No podrás revertir esta acción.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
            });

            if (result.isConfirmed) {
                const index = crudStore.items.findIndex((item) => item.id === id);
                if (index !== -1) {
                    crudStore.items.splice(index, 1);
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El elemento ha sido eliminado.',
                        icon: 'success',
                    });
                }
            }
        };

        return {
            crudStore,
            editingItem,
            startEdit,
            submitEdit,
            cancelEdit,
            confirmDelete,
        };
    },
};
</script>