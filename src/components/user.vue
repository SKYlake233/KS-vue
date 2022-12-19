<template>
  {{ user }}
</template>


<script>
import requests from "@/utils/requests";

export default {
  name: "user",
  data(){
    return{
      user:"",
    }
  },
  mounted() {
    requests.get("/user/data").then(res =>{
      console.log(res.data)
      this.user = res.data;
    });
  },
  methods:{

  }
}
</script>

<style scoped>

</style>