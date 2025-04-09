<template>
  <div class="container mt-4">
    <div v-if="!showContactForm && !showGroupForm">
      <ContactList @show-form="handleShowContactForm" />
      <GroupList @show-group-form="handleShowGroupForm" />
    </div>
    <ContactForm 
      v-if="showContactForm" 
      :mode="formMode" 
      :contact="selectedContact" 
      @form-closed="showContactForm = false" 
    />
    <GroupForm 
      v-if="showGroupForm" 
      :mode="groupFormMode" 
      :group="selectedGroup"
      @form-closed="showGroupForm = false" 
    />
  </div>
</template>

<script>
import ContactList from '@/components/ContactList.vue'
import ContactForm from '@/components/ContactForm.vue'
import GroupList from '@/components/GroupList.vue'
import GroupForm from '@/components/GroupForm.vue'

export default {
  name: 'HomeView',
  components: {
    ContactList,
    ContactForm,
    GroupList,
    GroupForm
  },
  data() {
    return {
      showContactForm: false,
      showGroupForm: false,
      formMode: 'add',
      groupFormMode: 'add',
      selectedContact: null,
      selectedGroup: null
    }
  },
  methods: {
    handleShowContactForm(payload) {
      this.showContactForm = true;
      this.showGroupForm = false; // グループフォームを非表示に
      this.formMode = payload.mode;
      this.selectedContact = payload.contact || null;
    },
    handleShowGroupForm(payload) {
      this.showGroupForm = true;
      this.showContactForm = false; // コンタクトフォームを非表示に
      this.groupFormMode = payload.mode;
      this.selectedGroup = payload.group || null;
    }
  }
}
</script>