<template>
    <div class="container mt-4">
        <h2 class="mb-4">Lista de Elementos</h2>
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in crudStore.items" :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>
                        <button class="btn btn-primary btn-sm me-2" @click="editItem(item.id)">Editar</button>
                        <button class="btn btn-danger btn-sm" @click="deleteItem(item.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Componente de edición -->
        <EditItem v-if="editingItemId !== null" :itemId="editingItemId" @edit-completed="clearEditing"
            @edit-cancelled="clearEditing" />
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