import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from './pages/coaches/CoachesList.vue'
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import store from './store/index.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      redirect: '/coaches' 
    },
    // Show List of coaches
    { 
      path: '/coaches', 
      component: CoachesList 
    },
    // Show Individual coaches
    { 
      path: '/coaches/:id', 
      component: CoachDetail, 
      props: true,
      children: [
        // /coaches/c1/contact
        // Contact coach
        { 
          path: 'contact', 
          component: ContactCoach 
        }
      ]
    },
    // Register as a coach
    { 
      path: '/register', 
      component: CoachRegistration,
      meta: {
        requiresAuth: true
      }
    },
    // Send requests to a coach
    { 
      path: '/requests', 
      component: RequestsReceived,
      meta: {
        requiresAuth: true
      }
    },
    // User Authentication Page
    {
      path: '/auth',
      component: UserAuth,
      meta: {
        requiresUnauth: true
      }
    },
    // Show not found page
    { 
      path: '/:notFound(.*)', 
      component: NotFound 
    },
  ],
})

// Navigation guard
router.beforeEach((to, _, next) => {
  // Check router meta and isAuthenticated from store/modules/auth
  // If the user requires authentication...
  if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
    // navigate the user to /auth
    next('/auth')
  // If the user is logged in already...
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    // navigate the user to /coaches
    next('/coaches')
  } else {
    next()
  }
})

export default router