<template>
    <div>
        <h2>Lista de Elementos</h2>
        <ul>
            <li v-for="item in crudStore.items" :key="item.id">
                {{ item.name }} - {{ item.description }}
                <button @click="editItem(item.id)">Editar</button>
                <button @click="deleteItem(item.id)">Eliminar</button>
            </li>
        </ul>
        <EditItem v-if="editingItemId" :itemId="editingItemId" @edit-completed="clearEditing"
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