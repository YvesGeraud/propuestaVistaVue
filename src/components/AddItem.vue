<template>
    <div class="container mt-4">
        <h2 class="mb-4">Agregar Elemento</h2>
        <form @submit.prevent="submitForm">
            <div class="mb-3">
                <label for="name" class="form-label">Nombre</label>
                <input id="name" type="text" class="form-control" v-model="name" placeholder="Escribe el nombre"
                    required />
            </div>
            <div class="mb-3">
                <label for="description" class="form-label">Descripción</label>
                <input id="description" type="text" class="form-control" v-model="description"
                    placeholder="Escribe la descripción" required />
            </div>
            <button class="btn btn-success" type="submit">Agregar</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useCrudStore } from '../stores/crudStore';

export default {
    setup() {
        const crudStore = useCrudStore();
        const name = ref('');
        const description = ref('');

        const submitForm = () => {
            crudStore.addItem({ name: name.value, description: description.value });
            name.value = '';
            description.value = '';
        };

        return {
            name,
            description,
            submitForm,
        };
    },
};
</script>