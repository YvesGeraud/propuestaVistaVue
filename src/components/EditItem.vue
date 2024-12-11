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
import { ref, watch } from 'vue';
import Swal from 'sweetalert2';

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

        // Cargar datos del elemento actual
        const loadItemData = () => {
            const item = crudStore.items.find((i) => i.id === props.itemId);
            if (item) {
                name.value = item.name;
                description.value = item.description;
            } else {
                console.error(`Elemento con ID ${props.itemId} no encontrado`);
            }
        };

        // React a cambios en itemId
        watch(() => props.itemId, loadItemData, { immediate: true });

        // Guardar cambios
        const submitForm = () => {
            crudStore.updateItem(props.itemId, {
                name: name.value,
                description: description.value,
            });
            Swal.fire('¡Actualizado!', 'El elemento se actualizó correctamente.', 'success');
            emit('edit-completed');
        };

        // Cancelar edición
        const cancelEdit = () => {
            emit('edit-cancelled');
        };

        return {
            name,
            description,
            submitForm,
            cancelEdit,
        };
    },
};
</script>