<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "./notifications.js";

    export let themes = {
        danger: "bg-danger",
        success: "bg-success",
        warning: "bg-warning",
        info: "bg-info",
        default: "bg-primary",
    };
</script>

<div class="toast-container position-absolute p-3 top-0 end-0">
    {#each $notifications as notification (notification.id)}

        <div 
            animate:flip 
            transition:fly={{ y: 30 }} 
            class="toast align-items-center text-white {themes[notification.type]} border-0 show" 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true"
        >
            <div class="d-flex">
                <div class="toast-body">
                    {#if notification.icon}<i class={notification.icon} />{/if}
                    {notification.message}
                </div>
                 <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>

    {/each}
</div>
