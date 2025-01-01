<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData, ActionData } from "./$types";
    let { form }: { data: PageData; form: ActionData } = $props();
    let copied = $state(false);

    let url = $state("");

    onMount(() => {
        url = `${window.location.origin}/entry/${form?.key}`;
    });
</script>

{#if form?.success && form.key}
    <input
        class="p-3 border border-grape bg-transparent placeholder:text-grape/40 mt-8"
        value={url}
        type="text"
        readonly={true}
    />
    <button
        onclick={async () => {
            await navigator.clipboard.writeText(url);
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
    <a href="/" class="text-center mt-2"> back home </a>
{:else}
    <div class="mx-auto mt-8 flex flex-col w-full max-w-4xl">
        <form class="flex flex-col" method="POST">
            <textarea
                class="p-3 border border-grape bg-transparent resize-none h-96 placeholder:text-grape/40"
                name="content"
                placeholder="type anything"
                id=""
            ></textarea>
            <input
                placeholder="enter your pin"
                class="p-3 border border-grape bg-transparent placeholder:text-grape/40 mt-2"
                name="pin"
                type="text"
            />
            <button class="bg-grape text-lavender px-4 py-2.5 mt-2">save</button
            >
            {#if form?.badPin}<p class="text-center mt-2 text-red-800">
                    Bad pin
                </p>{/if}
            {#if form?.noContent}<p class="text-center mt-2 text-red-800">
                    No Content
                </p>{/if}
        </form>
    </div>
{/if}
