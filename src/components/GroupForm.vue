<!-- src/components/GroupForm.vue -->
<template>
    <div class="card mt-4">
        <div class="card-header">
            <h3>{{ formTitle }}</h3>
        </div>
        <div class="card-body">
            <form @submit.prevent="submitForm">
                <div class="mb-3">
                    <label for="groupName" class="form-label">グループ名</label>
                    <input id="groupName" v-model="form.name" type="text" class="form-control">
                    <div v-if="error" class="text-danger">{{ error }}</div>
                </div>

                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary" @click="closeForm">キャンセル</button>
                    <button type="submit" class="btn btn-primary">保存</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GroupForm',
    props: {
        mode: {
            type: String,
            default: 'add',
            validator: value => ['add', 'edit'].includes(value)
        },
        group: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            form: {
                name: ''
            },
            error: ''
        }
    },
    computed: {
        formTitle() {
            return this.mode === 'add' ? 'グループ作成' : 'グループ編集'
        }
    },
    methods: {
        closeForm() {
            this.$emit('form-closed')
        },
        validate() {
            this.error = ''

            if (!this.form.name) {
                this.error = 'グループ名を入力してください'
                return false
            }

            return true
        },
        submitForm() {
            if (!this.validate()) {
                return
            }

            if (this.mode === 'add') {
                this.$store.dispatch('addGroup', { ...this.form })
            } else {
                this.$store.dispatch('updateGroup', {
                    id: this.group.id,
                    ...this.form
                })
            }

            this.closeForm()
        }
    },
    created() {
        if (this.mode === 'edit' && this.group) {
            this.form = { ...this.group }
        }
    }
}
</script>