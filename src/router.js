import { createRouter, createWebHistory } from 'vue-router'

import CoachesList from './pages/coaches/CoachesList.vue'
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue'

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
      component: CoachRegistration 
    },
    // Send requests to a coach
    { 
      path: '/requests', 
      component: RequestsReceived 
    },
    // Show not found page
    { 
      path: '/:notFound(.*)', 
      component: NotFound 
    },
  ],
})

export default router