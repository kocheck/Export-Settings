<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';

  export let type: 'success' | 'error' | 'info' = 'info';
  export let message: string;
  export let duration = 3000;

  const dispatch = createEventDispatcher();

  let timeoutId: number;

  $: {
    if (duration) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch('dismiss');
      }, duration);
    }
  }
</script>

<div
  class="toast {type}"
  transition:fly={{ y: 50, duration: 200 }}
  on:click={() => dispatch('dismiss')}
>
  <div class="icon">
    {#if type === 'success'}
      ✓
    {:else if type === 'error'}
      !
    {:else}
      i
    {/if}
  </div>
  <span class="message">{message}</span>
</div>

<style>
  .toast {
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-radius: 8px;
    background: var(--figma-color-bg);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 1000;
  }

  .success { background: var(--figma-color-bg-success); }
  .error { background: var(--figma-color-bg-danger); }
  .info { background: var(--figma-color-bg-info); }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    border-radius: 50%;
    font-weight: bold;
  }

  .message {
    font-size: 13px;
    color: var(--figma-color-text);
  }
</style>