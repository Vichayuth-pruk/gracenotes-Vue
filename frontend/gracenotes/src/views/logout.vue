<template>
<div></div>
</template>

<script>
// import axios from "axios"
export default {
  data() {
    return {
        info: "",
    };
  },
  created(){
      this.logout()
  },
  methods: {
    logout() {
        localStorage.removeItem('formLogin')
        alert("ลงชื่อออก!")
        this.$router.push({ name: "index" });
    },
  },
};
</script>


<style scoped>
</style>