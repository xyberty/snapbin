<script lang="ts">
    import type { PageData, ActionData } from "./$types";
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let { data, form }: { data: PageData; form: ActionData } = $props();
    let copied = $state(false);

    // Content can come from either data (if not protected) or form (after successful PIN entry)
    const content = $derived(data.content || form?.content);

    onMount(() => {
        if (typeof window !== 'undefined' && (window as any).gtag && content) {
            const gtag = (window as any).gtag;
            gtag('event', 'entry_view', {
                page_location: window.location.href,
                page_path: $page.url.pathname,
                entry_size: content.length
            });
        }
    });
</script>

<svelte:head>
    <title>View Pego</title>
</svelte:head>

<div class="mx-auto mt-8 flex flex-col w-full max-w-4xl">
    {#if content}
        <textarea
            class="p-3 border border-grape dark:border-light-grape bg-transparent resize-none h-96 placeholder:text-grape/40 dark:placeholder:text-light-grape/40 text-grape dark:text-light-grape"
            name="content"
            placeholder="type anything"
            id=""
            readonly={true}>{content}</textarea
        >
        <button
            onclick={async () => {
                await navigator.clipboard.writeText(content);
                copied = true;
            }}
            class="{copied
                ? 'bg-transparent text-grape dark:text-light-grape border border-grape dark:border-light-grape'
                : 'bg-grape dark:bg-light-grape text-lavender dark:text-dark-lavender'}  px-4 py-2.5 mt-2"
        >
            {#if copied}
                copied!
            {:else}
                copy
            {/if}
        </button>
    {:else if data.protected}
        <form method="POST" class="flex flex-col">
            <p class="text-grape dark:text-light-grape mb-4 text-center">this pego is pin-protected</p>
            <input
                type="text"
                name="pin"
                placeholder="enter pin"
                class="p-3 border border-grape dark:border-light-grape bg-transparent placeholder:text-grape/40 dark:placeholder:text-light-grape/40 text-grape dark:text-light-grape"
                autocomplete="off"
                required
            />
            <button class="bg-grape dark:bg-light-grape text-lavender dark:text-dark-lavender px-4 py-2.5 mt-2">
                unlock
            </button>
            {#if form?.badPin}
                <p class="text-center mt-2 text-red-800 dark:text-red-400">
                    incorrect pin
                </p>
            {/if}
        </form>
    {/if}
</div>
