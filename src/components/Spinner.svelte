<script lang="ts">
  export let size = 24;
  export let color = 'currentColor';
</script>

<div
  class="spinner"
  style="width: {size}px; height: {size}px; border-color: {color}"
>
</div>

<style>
  .spinner {
    border: 2px solid;
    border-radius: 50%;
    border-right-color: transparent;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>