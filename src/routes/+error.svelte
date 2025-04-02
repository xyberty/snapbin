<script lang="ts">
	// import Page from '$c/Page.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} {$page?.error?.message}</title>
</svelte:head>

{#if $page.status === 404}
    <div class="space-y-4">
        <h1 class="text-2xl font-bold mb-6 text-grape dark:text-light-grape">Entry Not Found</h1>
        <p class="text-grape/80 dark:text-light-grape/80">The entry you're looking for doesn't exist or has expired.</p>
    </div>
    <a href="/" class="text-grape dark:text-light-grape underline mt-4">back home</a>
{:else if $page.status === 403}
    <!-- 403 error description -->
{:else}
    <!-- other error description -->
{/if}
