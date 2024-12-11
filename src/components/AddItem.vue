<template>
    <div>
        <h2>Agregar Elemento</h2>
        <form @submit.prevent="submitForm">
            <input v-model="name" placeholder="Nombre" required />
            <input v-model="description" placeholder="Descripción" required />
            <button type="submit">Agregar</button>
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