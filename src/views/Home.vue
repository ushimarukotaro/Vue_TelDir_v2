<template>
    <div>
        <ContactList v-if="!showForm" @show-form="handleShowForm" />
        <ContactForm
            v-else
            :mode="formMode"
            :contact="selectedContact"
            @form-closed="showForm = false"
        />
    </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue'
import ContactForm from '@/components/ContactForm.vue' 

export default {
    name: 'HomeView',
    components: {
        ContactList,
        ContactForm
    },
    data() {
        return {
            showForm: false,
            formMode: 'add',
            selectedContact: null
        }
    },
    methods: {
        handleShowForm({ mode, contact = null }) {
            this.formMode = mode
            this.selectedContact = contact
            this.showForm = true
        }
    }
}
</script>