// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import ContactForm from '../components/ContactForm.vue'
import GroupForm from '../components/GroupForm.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/contact/add',
        name: 'ContactAdd',
        component: ContactForm,
        props: {
            mode: 'add'
        }
    },
    {
        path: '/contact/edit/:id',
        name: 'ContactEdit',
        component: ContactForm,
        props: route => ({
            mode: 'edit',
            contactId: route.params.id
        })
    },
    {
        path: '/group/add',
        name: 'GroupAdd',
        component: GroupForm,
        props: {
            mode: 'add'
        }
    },
    {
        path: '/group/edit/:id',
        name: 'GroupEdit',
        component: GroupForm,
        props: route => ({
            mode: 'edit',
            groupId: route.params.id
        })
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 