<script lang="ts">
    import '../app.css';
	import { page } from '$app/stores';
	import { theme } from '$lib/stores/theme';
	let { children } = $props();
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
</script>

<svelte:head>
    {#if gaId}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
        <script>
            window.dataLayer = window.dataLayer || []
            function gtag() {
                dataLayer.push(arguments)
            }
            gtag('js', new Date())
            gtag('config', '{gaId}')
        </script>
    {/if}
</svelte:head>

<div class="min-h-screen bg-lavender dark:bg-dark-lavender flex flex-col">
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
            <a href="https://github.com/xyberty/snapbin" class="text-grape lowercase dark:text-light-grape hover:underline">GitHub</a>
            <a href="/info" class="text-grape lowercase dark:text-light-grape hover:underline">Info</a>
        </div>
    </header>

    <main class="flex-grow">
        <div class="mx-auto mt-8 flex flex-col w-full max-w-2xl">
            {@render children()}
        </div>
    </main>

    <footer class="py-4 border-t border-grape dark:border-light-grape">
        <div class="flex justify-between items-center text-sm text-grape/60 dark:text-light-grape">
            <p class="lowercase">Built using <em title="SvelteKit" class="border-b-[1px] border-dotted hover:border-solid border-grape/60 dark:border-light-grape">SvelteKit</em>, <em title="MongoDB" class="border-b-[1px] border-dotted hover:border-solid border-grape/60 dark:border-light-grape">MongoDB</em>, and <em title="Tailwind CSS" class="border-b-[1px] border-dotted hover:border-solid border-grape/60 dark:border-light-grape">Tailwind CSS</em></p>
            <p class="mt-1">© {new Date().getFullYear() === 2025 ? '2025' : `2025–${new Date().getFullYear()}`}</p>
        </div>
    </footer>
</div>
