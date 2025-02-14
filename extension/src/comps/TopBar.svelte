<script lang="ts">
  import { globalStore } from "../lib/store";
  import type { IPages } from "../lib/types";

  // let props = $props<{ backPage: IPages }>();

  const pagesTitles: Record<IPages, string> = {
    HOME: "Employee.ai",
    TWITTER: "Twitter Employee",
    INSTAGRAM: "Instagram Employee",
    LINKEDIN: "LinkedIn Employee",
    SETTINGS: "Settings",
  };
  const backPages: Record<IPages, IPages> = {
    HOME: "HOME",
    TWITTER: "HOME",
    INSTAGRAM: "HOME",
    LINKEDIN: "HOME",
    SETTINGS: "HOME",
  };
</script>

<section
  class="h-[60px] bg-background shadow-md flex w-full items-center justify-center fixed top-0"
>
  <div class="flex items-center justify-between w-full px-4">
    <button
      onclick={() => {
        $globalStore.pages = backPages[$globalStore.pages];
      }}>b</button
    >
    <p class="font-bold">{pagesTitles[$globalStore.pages]}</p>
    <p>s</p>
  </div>
</section>
