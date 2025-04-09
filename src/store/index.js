// src/store/index.js
import { createStore } from 'vuex'

export default createStore({
    state: {
        contacts: [
            { id: 1, name: '山田太郎', phone: '090-1234-5678', email: 'yamada@example.com' },
            { id: 2, name: '佐藤花子', phone: '080-8765-4321', email: 'sato@example.com' }
        ],
        groups: []
    },
    getters: {
        getContacts: state => state.contacts,
        getAllGroups(state) {
            return state.groups
        },
        getContactsByGroup: (state) => (groupId) => {
            return state.contacts.filter(contact => contact.groupId === groupId)
        }
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
        },
        SET_CONTACTS(state, contacts) {
            state.contacts = contacts;
        },
        SET_GROUPS(state, groups) {
            state.groups = groups;
        },
        ADD_GROUPS(state, group) {
            state.groups.push(group);
        },
        UPDATE_GROUPS(state, updatedGroup) {
            const index = state.groups.findIndex(g => g.id === updatedGroup.id);
            if (index !== -1) {
                state.groups.splice(index, 1, updatedGroup);
            }
        },
        DELETE_GROUPS(state, groupId) {
            state.groups = state.groups.filter(group => group.id !== groupId);
        }
    },
    actions: {
        loadContacts({ commit }) {
            const savedContacts = localStorage.getItem('contacts')
            if (savedContacts) {
                commit('SET_CONTACTS', JSON.parse(savedContacts))
            }
        },
        saveContacts({ state }) {
            localStorage.setItem('contacts', JSON.stringify(state.contacts))
        },
        addContact({ commit, dispatch }, contact) {
            const newContact = {
                ...contact,
                id: Date.now()
            };
            commit('ADD_CONTACT', newContact);
            dispatch('saveContacts');
            return newContact;
        },
        updateContact({ commit, dispatch }, contact) {
            commit('UPDATE_CONTACT', contact);
            dispatch('saveContacts');
        },
        deleteContact({ commit, dispatch }, id) {
            commit('DELETE_CONTACT', id);
            dispatch('saveContacts');
        },
        loadGroups({ commit }) {
            const savedGroups = localStorage.getItem('groups')
            if(savedGroups) {
                commit('SET_GROUPS', JSON.parse(savedGroups));
            }
        },
        saveGroups({ state }) {
            localStorage.setItem('groups', JSON.stringify(state.groups));
        },
        addGroup({ commit, dispatch }, group) {
            const newGroup = {
                ...group,
                id: Date.now()
            };
            commit('ADD_GROUPS', newGroup);
            dispatch('saveGroups');
            return newGroup;
        },
        updateGroup({ commit, dispatch }, group) {
            commit('UPDATE_GROUPS', group);
            dispatch('saveGroups');
        },
        deleteGroup({ commit, dispatch, state }, groupId) {
            const contactsToUpdate = state.contacts.filter(c => c.groupId === groupId);
            contactsToUpdate.forEach(contact => {
                dispatch('updateContact', {...contact, groupId: null });
            });
            commit('DELETE_GROUPS', groupId);
            dispatch('saveGroups');
        },
    }
})
