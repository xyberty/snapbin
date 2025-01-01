<script lang="ts">
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    let copied = $state(false);
</script>

{#if data.content}
    <div class="mx-auto mt-8 flex flex-col w-full max-w-4xl">
        <textarea
            class="p-3 border border-grape bg-transparent resize-none h-96 placeholder:text-grape/40"
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
                ? 'bg-transparent text-grape border border-grape'
                : 'bg-grape text-lavender'}  px-4 py-2.5 mt-2"
        >
            {#if copied}
                copied!
            {:else}
                copy
            {/if}
        </button>
    </div>
{/if}
