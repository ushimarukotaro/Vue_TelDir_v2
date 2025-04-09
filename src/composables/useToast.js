import { provide, inject } from 'vue'
import { Toast } from 'bootstrap'

const TOAST_KEY = Symbol('toast')

export function provideToast() {
    const showToast = (message) => {
        const toast = document.querySelector('.toast')
        if (toast) {
            const bsToast = new Toast(toast)
            document.querySelector('.toast-body').textContent = message
            bsToast.show()
        }
    }

    provide(TOAST_KEY, showToast)
}

export function useToast() {
    const showToast = inject(TOAST_KEY)
    if (!showToast) {
        throw new Error('Toast was not provided')
    }
    return { showToast }
}