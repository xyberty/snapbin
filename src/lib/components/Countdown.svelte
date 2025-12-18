<script lang="ts">
    import { onMount, onDestroy } from 'svelte';

    let { expiresAt }: { expiresAt: string | null } = $props();
    let timeLeft = $state('');
    let interval: any;

    function updateCountdown() {
        if (!expiresAt) return;
        
        const now = new Date().getTime();
        const expiry = new Date(expiresAt).getTime();
        const diff = expiry - now;

        if (diff <= 0) {
            timeLeft = 'expired';
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0 || hours > 0) parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        timeLeft = parts.join(' ');
    }

    onMount(() => {
        updateCountdown();
        interval = setInterval(updateCountdown, 1000);
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

{#if expiresAt && timeLeft}
    <div class="text-[10px] uppercase tracking-wider text-grape/50 dark:text-light-grape/50 mt-1 flex items-center justify-center gap-1">
        <span>expires in</span>
        <span class="font-mono">{timeLeft}</span>
    </div>
{/if}

