<script lang="ts">
  import { cn } from "../../lib/utils";

  let props = $props<{
    data: {
      title: string;
      key: string;
    }[];
    activeKey: string;
    onClick: (key: string) => void;
  }>();
</script>

<div class="flex items-center justify-around bg-card">
  {#each props.data as tab}
    <button
      class={cn(
        "w-full py-2 border-b-2 flex items-center justify-center",
        tab.key === props.activeKey ? "border-b-primary" : "border-b-card"
      )}
      onclick={() => {
        props.onClick(tab.key);
      }}
    >
      <p class=" text-xs font-light">{tab.title}</p>
    </button>
  {/each}
</div>
