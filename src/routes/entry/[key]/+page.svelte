<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from '$app/state';

    let { data }: { data: PageData } = $props();
    let copied = $state(false);
</script>

{#if !data?.content}
    <div class="mx-auto mt-8 flex flex-col w-full max-w-4xl text-center">
        <h1 class="text-2xl font-bold mb-4 text-grape dark:text-light-grape">Entry Not Found</h1>
        <p class="text-grape/80 dark:text-light-grape/80">The entry you're looking for doesn't exist or has expired.</p>
        <a href="/" class="text-grape dark:text-light-grape underline mt-4">Back to home</a>
    </div>
{:else}
    <div class="mx-auto mt-8 flex flex-col w-full max-w-4xl">
        <textarea
            class="p-3 border border-grape dark:border-light-grape bg-transparent resize-none h-96 placeholder:text-grape/40 dark:placeholder:text-light-grape/40 text-grape dark:text-light-grape"
            name="content"
            placeholder="type anything"
            id=""
            readonly={true}>{data.content}</textarea
        >
        <button
            onclick={async () => {
                await navigator.clipboard.writeText(data.content);
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
    </div>
{/if}
