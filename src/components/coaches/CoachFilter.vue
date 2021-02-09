<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input type="checkbox" id="frontend" checked @change="setFilter">
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="backend" checked @change="setFilter">
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input type="checkbox" id="career" checked @change="setFilter">
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  // @change-filter=""
  emits: ['change-filter'],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true
      }
    }
  },
  methods: {
    setFilter(event) {
      console.log(event)
      const inputId = event.target.id
      const isActive = event.target.checked
      const updatedFilters = {
        // spread operator
        // Clones the data inside this.filters and spreads them out inside this object
        ...this.filters,
        // Computed property names
        // Finds the key that matches with [inputId] in cloned version of ...this.filters and overwrites the matched data with [inputId]: isActive data
        [inputId]: isActive
      }
      this.filters = updatedFilters

      // This passes the updated filter data to CoachesList.vue (parent component)
      this.$emit('change-filter', updatedFilters)
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>