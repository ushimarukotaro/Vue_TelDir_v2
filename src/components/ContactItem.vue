<!-- src/components/ContactItem.vue -->
<template>
    <tr>
        <td class="text-center">
            <input type="checkbox" :checked="selected" @change="$emit('selection-changed', contact.id)">
        </td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.phone }}</td>
        <td>{{ contact.email }}</td>
        <td>{{ getGroupName(contact.groupId) }}</td>
        <td class="text-center">
            <button type="button" class="btn btn-secondary btn-sm me-2" @click="$emit('edit', contact)">編集</button>
            <button type="button" class="btn btn-danger btn-sm" @click="deleteItem">削除</button>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'ContactItem',
    props: {
        contact: {
            type: Object,
            required: true
        },
        selected: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        deleteItem() {
            if (confirm(`${this.contact.name}の連絡先を削除しますか？`)) {
                this.$store.dispatch('deleteContact', this.contact.id)
            }
        },
        getGroupName(groupId) {
            if (!groupId) return '';
            const group = this.groups.find(g => g.id === groupId);
            return group ? group.name : ''
        }
    }
}
</script>