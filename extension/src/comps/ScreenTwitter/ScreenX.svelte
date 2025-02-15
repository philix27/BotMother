<script lang="ts">
  import Button from "../../components/button/button.svelte";
import NewTweet from "./NewTweet.svelte";
import Tab from "./Tab.svelte";

  type ITabs = "ALL" | "PENDING" | "COMPLETED"
  let activeTab = $state<ITabs>("ALL");

</script>

<Tab
  data={[
    {
      title: "All",
      key: "ALL",
    },
    {
      title: "Pending",
      key: "PENDING",
    },
    {
      title: "Completed",
      key: "COMPLETED",
    },
  ]}
  activeKey={activeTab}
  onClick={(key) => {
    activeTab = key  as ITabs
  }}
/>


<NewTweet />
<div class="flex items-center justify-center">
  <Button size="sm" > Save</Button> 
</div>
