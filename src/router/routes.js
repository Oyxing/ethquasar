
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'userlist', component: () => import('pages/Userlist.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/User.vue'),
    children: [
      { path: 'login', component: () => import('components/login.vue') },
      { path: 'register', component: () => import('components/register.vue') }
    ]
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
