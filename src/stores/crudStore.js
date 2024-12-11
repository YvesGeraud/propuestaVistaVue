import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useCrudStore = defineStore('crud', () => {
    // Estado
    const items = reactive([
        { id: 1, name: 'Elemento 1', description: 'Descripción del elemento 1' },
        { id: 2, name: 'Elemento 2', description: 'Descripción del elemento 2' },
    ]);

    // Métodos para el CRUD
    const addItem = (item) => {
        items.push({ id: Date.now(), ...item });
    };

    const updateItem = (id, updatedItem) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
            items[index] = { ...items[index], ...updatedItem };
        } else {
            console.error('No se encontró el item con ID:', id);
        }
    };


    const deleteItem = (id) => {
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
        }
    };

    /*crudStore.updateItem(1, { name: 'Nuevo Nombre', description: 'Nueva Descripción' });
    console.log(crudStore.items);*/


    return {
        items,
        addItem,
        updateItem,
        deleteItem,
    };
});
