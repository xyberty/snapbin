<script lang="ts">
    const timeoutHours = import.meta.env.ENTRY_TIMEOUT_HOURS || 12;
</script>

<svelte:head>
    <title>About Pego</title>
</svelte:head>

<div class="mx-auto mt-8 flex flex-col w-full max-w-2xl">
    <h1 class="text-xl font-semibold mb-6 text-grape dark:text-light-grape lowercase">About Pego</h1>
    
    <div class="space-y-4 text-grape/80 dark:text-light-grape/80">
        <p>
            Pego is a simple, secure way to share text snippets. It allows you to share code snippets, notes, or any text content that disappears with time.
        </p>
        
        <p>
            Your entries are automatically deleted after {timeoutHours} hours, ensuring your data doesn't linger around. The pin code is shared with a limited number of people to prevent service abuse.
        </p>
        
        <p>
            No accounts needed. No tracking. Just pure, simple text sharing.
        </p>
    </div>

    <a href="/" class="text-grape dark:text-light-grape underline mt-8">back home</a>
</div>
