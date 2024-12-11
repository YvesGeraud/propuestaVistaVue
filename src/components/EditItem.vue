<template>
    <div class="container mt-4">
        <h2 class="mb-4">Editar Elemento</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="editName" class="form-label">Nombre</label>
                <input id="editName" type="text" class="form-control" v-model="name" placeholder="Nombre" required />
            </div>
            <div class="mb-3">
                <label for="editDescription" class="form-label">Descripción</label>
                <input id="editDescription" type="text" class="form-control" v-model="description"
                    placeholder="Descripción" required />
            </div>
            <div>
                <button class="btn btn-primary me-2" type="submit">Actualizar</button>
                <button class="btn btn-secondary" type="button" @click="cancelEdit">Cancelar</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useCrudStore } from '../stores/crudStore';
import { ref, watch, onMounted } from 'vue';

export default {
    props: {
        itemId: {
            type: Number,
            required: true,
        },
    },
    setup(props, { emit }) {
        const crudStore = useCrudStore();
        const name = ref('');
        const description = ref('');

        // Cargar datos iniciales
        const loadItemData = () => {
            const item = crudStore.items.find((i) => i.id === props.itemId);
            if (item) {
                name.value = item.name;
                description.value = item.description;
            } else {
                console.error(`No se encontró el elemento con ID: ${props.itemId}`);
            }
        };

        watch(() => props.itemId, loadItemData, { immediate: true });

        const submitForm = () => {
            crudStore.updateItem(props.itemId, {
                name: name.value,
                description: description.value,
            });
            emit('edit-completed'); // Cierra el formulario después de guardar
        };

        const cancelEdit = () => {
            emit('edit-cancelled'); // Solo cierra el formulario
        };

        onMounted(() => {
            loadItemData();
        });

        return {
            name,
            description,
            submitForm,
            cancelEdit,
        };
    },
};
</script>