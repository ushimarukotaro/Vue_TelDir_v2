<!-- src/components/GroupList.vue -->
<template>
    <div class="card mt-4">
        <div class="card-header">
            <h3>グループ一覧</h3>
        </div>
        <div class="card-body">
            <button class="btn btn-primary mb-3" @click="showAddForm">新規グループ</button>

            <table class="table table-sm table-hover">
                <thead>
                    <tr>
                        <th>選択</th>
                        <th>グループ名</th>
                        <th>編集</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="group in groups" :key="group.id">
                        <td>
                            <input type="checkbox" v-model="selectedGroups" :value="group.id">
                        </td>
                        <td>{{ group.name }}</td>
                        <td>
                            <button type="button" class="btn btn-sm" @click="editGroup(group)">
                                <i class="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button class="btn btn-danger" @click="deleteSelected" :disabled="!selectedGroups.length">削除</button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'GroupList',
    data() {
        return {
            selectedGroups: []
        }
    },
    computed: {
        ...mapGetters({
            groups: 'getAllGroups'
        })
    },
    methods: {
        showAddForm() {
            this.$emit('show-group-form', { mode: 'add' })
        },
        editGroup(group) {
            this.$emit('show-group-form', { mode: 'edit', group })
        },
        deleteSelected() {
            if (confirm('選択したグループを削除しますか？')) {
                this.selectedGroups.forEach(groupId => {
                    this.$store.dispatch('deleteGroup', groupId)
                })
                this.selectedGroups = []
            }
        }
    },
    created() {
        this.$store.dispatch('loadGroups')
    }
}
</script>