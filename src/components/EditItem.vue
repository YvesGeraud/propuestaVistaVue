<template>
    <div v-if="isEditing">
        <h2>Editar Elemento</h2>
        <form @submit.prevent="submitForm">
            <input v-model="name" placeholder="Nombre" required />
            <input v-model="description" placeholder="Descripción" required />
            <button type="submit">Actualizar</button>
            <button type="button" @click="cancelEdit">Cancelar</button>
        </form>
    </div>
</template>

<script>
import { useCrudStore } from '../stores/crudStore';
import { ref, watch } from 'vue';

export default {
    props: {
        itemId: {
            type: Number,
            required: true,
        },
    },
    setup(props, { emit }) {
        const crudStore = useCrudStore();

        // Referencias locales para los campos del formulario
        const name = ref('');
        const description = ref('');
        const isEditing = ref(false);

        // Observar cambios en el itemId y cargar datos del elemento
        watch(
            () => props.itemId,
            (newId) => {
                console.log('Editando item con ID:', newId);
                const item = crudStore.items.find((i) => i.id === newId);
                if (item) {
                    console.log('Datos del item:', item);
                    name.value = item.name;
                    description.value = item.description;
                    isEditing.value = true;
                }
            }
        );

        const submitForm = () => {
            crudStore.updateItem(props.itemId, {
                name: name.value,
                description: description.value,
            });
            isEditing.value = false;
            emit('edit-completed');
        };

        const cancelEdit = () => {
            isEditing.value = false;
            emit('edit-cancelled');
        };

        const editItem = (id) => {
            console.log('Editar item con ID:', id);
            editingItemId.value = id;
        };


        return {
            name,
            description,
            submitForm,
            cancelEdit,
            isEditing,
        };
    },
};
</script>