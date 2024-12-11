<template>
  <div id="app">
    <AddItem />
    <ListItems />
  </div>
</template>

<script>
import AddItem from './components/AddItem.vue';
import ListItems from './components/ListItems.vue';

export default {
  components: {
    AddItem,
    ListItems,
  },
};
</script>
