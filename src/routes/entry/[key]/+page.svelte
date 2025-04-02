<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from '$app/state';

    let { data }: { data: PageData } = $props();
    let copied = $state(false);
</script>

{#if data.content}
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
