<template>
    <div class="container mt-4">
        <h2 class="mb-4">Lista de Elementos</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in crudStore.items" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" @click="editItem(item.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteItem(item.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { useCrudStore } from '../stores/crudStore';
import EditItem from './EditItem.vue';
import { ref } from 'vue';

export default {
    components: {
        EditItem,
    },
    setup() {
        const crudStore = useCrudStore();
        const editingItemId = ref(null);

        const editItem = (id) => {
            editingItemId.value = id;
        };

        const deleteItem = (id) => {
            crudStore.deleteItem(id);
        };

        const clearEditing = () => {
            editingItemId.value = null;
        };

        return {
            crudStore,
            editingItemId,
            editItem,
            deleteItem,
            clearEditing,
        };
    },
};
</script>