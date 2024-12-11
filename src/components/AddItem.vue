<template>
    <div class="container mt-4">
        <h2 class="mb-4">Agregar Elemento</h2>
        <form @submit.prevent="submitForm" class="form-inline">
            <div class="mb-3">
                <input class="form-control" v-model="name" placeholder="Nombre" required />
            </div>
            <div class="mb-3">
                <input class="form-control" v-model="description" placeholder="Descripción" required />
            </div>
            <button class="btn btn-success" type="submit">Agregar</button>
        </form>
    </div>
</template>


<script>
import { useCrudStore } from '../stores/crudStore';
import { ref } from 'vue';

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