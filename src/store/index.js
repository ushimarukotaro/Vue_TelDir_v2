// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
    state: {
        contacts: [
            { id: 1, name: '山田太郎', phone: '090-1234-5678', email: 'yamada@example.com' },
            { id: 2, name: '佐藤花子', phone: '080-8765-4321', email: 'sato@example.com' }
        ]
    },
    getters: {
        getContacts: state => state.contacts
    },
    mutations: {
        ADD_CONTACT(state, contact) {
            const newId = state.contacts.length > 0
                ? Math.max(...state.contacts.map(c => c.id)) + 1
                : 1;
            state.contacts.push({
                ...contact,
                id: newId
            });
        },
        UPDATE_CONTACT(state, updatedContact) {
            const index = state.contacts.findIndex(c => c.id === updatedContact.id);
            if (index !== -1) {
                state.contacts.splice(index, 1, updatedContact);
            }
        },
        DELETE_CONTACT(state, id) {
            state.contacts = state.contacts.filter(contact => contact.id !== id);
        }
    },
    actions: {
        addContact({ commit }, contact) {
            commit('ADD_CONTACT', contact);
        },
        updateContact({ commit }, contact) {
            commit('UPDATE_CONTACT', contact);
        },
        deleteContact({ commit }, id) {
            commit('DELETE_CONTACT', id);
        }
    }
})
