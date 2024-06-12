import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const base = import.meta.env.VITE_PATH

const routes = [
	{
		path: base,
		name: 'Home',
		component: Home,
	},
]

let process;
const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router