<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";
    import type { PageData, ActionData } from "./$types";
    let { form }: { data: PageData; form: ActionData } = $props();
    let copied = $state(false);
    let altchaState = $state("idle"); // idle, verifying, verified
    const appName = 'Pego';

    let url = $derived(form?.key ? `${typeof window !== 'undefined' ? window.location.origin : ''}/entry/${form.key}` : "");
    let altchaWidget: HTMLElement = $state() as any;

    onMount(async () => {
        await import('altcha');

        if (altchaWidget) {
            altchaWidget.addEventListener('statechange', (ev: any) => {
                altchaState = ev.detail.state;
            });
        }
    });

    function handleAltchaState(ev: any) {
        // Fallback for some browsers
        if (ev.detail) {
            altchaState = ev.detail.state;
        }
    }
</script>

<svelte:head>
    <title>{appName}</title>
</svelte:head>

{#if form?.success && form.key}
    <div class="mx-auto mt-8 flex flex-col w-full max-w-4xl">
        <input
            class="p-3 border border-grape dark:border-light-grape bg-transparent placeholder:text-grape/40 dark:placeholder:text-light-grape/40 mt-8 text-grape dark:text-light-grape"
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
                ? 'bg-transparent text-grape dark:text-light-grape border border-grape dark:border-light-grape'
                : 'bg-grape dark:bg-light-grape text-lavender dark:text-dark-lavender'}  px-4 py-2.5 mt-2"
        >
            {#if copied}
                copied!
            {:else}
                copy
            {/if}
        </button>
        <a href="/" class="text-center mt-2 text-grape underline dark:text-light-grape">back home</a>
    </div>
{:else}
    <div class="mx-auto mt-8 flex flex-col w-full max-w-4xl">
        <form 
            class="flex flex-col" 
            method="POST" 
            use:enhance
        >
            <textarea
                class="p-3 border border-grape dark:border-light-grape bg-transparent resize-none h-96 placeholder:text-grape/40 dark:placeholder:text-light-grape/40 text-grape dark:text-light-grape"
                name="content"
                placeholder="type anything"
                id=""
            >{form?.content ?? ''}</textarea>
            <input
                placeholder="optional pin to protect this pego"
                class="p-3 border border-grape dark:border-light-grape bg-transparent placeholder:text-grape/40 dark:placeholder:text-light-grape/40 mt-2 text-grape dark:text-light-grape"
                name="pin"
                type="text"
                value={form?.pin ?? ''}
            />
            
            <altcha-widget 
                bind:this={altchaWidget}
                challengeurl="/api/altcha" 
                auto="onload" 
                hidefooter
                hidelogo
                style="display: none;"
            ></altcha-widget>

            <button 
                type="submit"
                disabled={altchaState === 'verifying'}
                class="bg-grape dark:bg-light-grape text-lavender dark:text-dark-lavender px-4 py-2.5 mt-2 disabled:opacity-50"
            >
                {altchaState === 'verifying' ? 'verifying...' : 'save'}
            </button>
            {#if form?.noContent}<p class="text-center mt-2 text-red-800 dark:text-red-400">
                    no Content
                </p>{/if}
            {#if form?.retryAfter}<p class="text-center mt-2 text-red-800 dark:text-red-400">
                    Too many pastes. Please try again later.
                </p>{/if}
            {#if form?.captchaFailed}<p class="text-center mt-2 text-red-800 dark:text-red-400">
                    Security check failed. Please refresh.
                </p>{/if}
        </form>
    </div>
{/if}
