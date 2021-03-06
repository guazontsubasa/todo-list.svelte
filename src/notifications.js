import { writable, derived } from "svelte/store"

const TIMEOUT = 3000

function createNotificationStore (timeout) {
    const _notifications = writable([])

    function send (message, type = "default", timeout, icon = 'bi bi-bell-fill') {
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout, icon }]
        })
    }

    let timers = []

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const { subscribe } = notifications

    return {
        subscribe,
        send,
        default: (msg, timeout) => send(msg, "default", timeout, 'bi bi-bell-fill'),
        danger: (msg, timeout) => send(msg, "danger", timeout, 'bi bi-hand-thumbs-down'),
        warning: (msg, timeout) => send(msg, "warning", timeout, 'bi bi-patch-exclamation'),
        info: (msg, timeout) => send(msg, "info", timeout, 'bi bi-bell-fill'),
        success: (msg, timeout) => send(msg, "success", timeout, 'bi bi-check'),
    }
}

function id() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

export const notifications = createNotificationStore()