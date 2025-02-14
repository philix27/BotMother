<script>
  import { DashboardList } from "./Dashboard/data";
  import ScreenInsta from "./ScreenInsta/ScreenInsta.svelte";
  import ScreenLinkedin from "./ScreenLinkedin/ScreenLinkedin.svelte";
  import ScreenX from "./ScreenTwitter/ScreenX.svelte";
  import Dashboard from "./Dashboard/index.svelte";
  import { globalStore } from "../lib/store";
</script>

<div class="mt-[60px]">
  {#if $globalStore.pages === "HOME"}
    <Dashboard />
  {:else if $globalStore.pages === "INSTAGRAM"}
    <ScreenInsta />
  {:else if $globalStore.pages === "LINKEDIN"}
    <ScreenLinkedin />
  {:else if $globalStore.pages === "TWITTER"}
    <ScreenX />
  {:else if $globalStore.pages === "SETTINGS"}
    <Dashboard />
  {:else}
    <Dashboard />
  {/if}
</div>
