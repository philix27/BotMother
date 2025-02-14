<script lang="ts">
  import { globalStore } from "../../lib/store";
  import { DashboardList } from "./data";
  import Icon from "@iconify/svelte";
</script>

<div class="w-full">
  {#each DashboardList as item}
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      role="button"
      class="w-full bg-card py-2 px-4 my-1 flex gap-x-5 items-center"
      onclick={() => {
        $globalStore.pages = item.screen!;
      }}
    >
      <Icon icon={item.icon} width="35" height="35" />
      <div>
        <p class="font-bold">{item.title}</p>
        <p class="text-xs font-normal">{item.desc}</p>
      </div>
    </div>
  {/each}
</div>
