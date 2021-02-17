<template>
  <div>
    <!-- !!error translates string into truthy boolean value -->
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedin">Login to register as coach</base-button>
        <base-button v-if="isLoggedin && !isCoach && !isLoading" link to="/register">Register as Coach</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item 
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilter from '../../components/coaches/CoachFilter.vue'

export default {
  components: {
    CoachItem,
    CoachFilter
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      },
    }
  },
  computed: {
    isLoggedin() {
      return this.$store.getters.isAuthenticated
    },
    // This is for displaying register as a coach button only if the user is not already registered as a coach
    isCoach() {
      return this.$store.getters['coaches/isCoach']
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches']
      // This returns the filtered coaches array
      return coaches.filter(coach => {
        if(this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if(this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if(this.activeFilters.career && coach.areas.includes('career')) {
          return true
        }
        return false
      })
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches']
    }
  },
  created() {
    this.loadCoaches()
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters
    },
    // Receives data from coaches/actions.js
    async loadCoaches(refresh = false) {
      this.isLoading = true
      
      try {
        // Promise
        // Object style dispatch
        await this.$store.dispatch({
          type: 'coaches/loadCoaches',
          forceRefresh: refresh
        })
      } catch(error) {
        this.error = error.message || 'Something went wrong'
      }
      
      this.isLoading = false
    },
    handleError() {
      this.error = null
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>