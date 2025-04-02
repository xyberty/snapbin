<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/theme';
	let { children } = $props();
</script>

<div class="min-h-screen bg-lavender dark:bg-dark-lavender">
    <header class="flex justify-between items-center py-4 border-b border-grape dark:border-light-grape">
        <a href="/" class="text-3xl font-bold text-grape dark:text-light-grape lowercase">Pego</a>
        <div class="flex items-center gap-4">
            <button
                class="text-grape dark:text-light-grape"
                onclick={() => theme.update(t => t === 'dark' ? 'light' : 'dark')}
            >
                {#if $theme === 'dark'}
                    ☀️
                {:else}
                    🌙
                {/if}
            </button>
            <a href="/info" class="text-grape lowercase dark:text-light-grape hover:underline">Info</a>
        </div>
    </header>

    <div class="mx-auto mt-8 flex flex-col w-full max-w-2xl">
        {@render children()}
    </div>
</div>
