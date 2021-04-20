<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="."> Gracenotes </a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="register">ลงทะเบียนเข้าใช้งาน</a>
          </li>
        </ul>
      </div>
    </nav>
    <br /><br /><br />
    <div class="container">
      <div class="content">
        <h3>ลงชื่อเข้าใช้งาน</h3>
        <br />
        <label for="user">รหัสนักเรียน</label>
        <input
          type="text"
          v-model="user"
          class="form-control"
          placeholder="รหัสนักเรียน"
          name="user"
          maxlength="10"
          required
        />
        <label for="password">รหัสผ่าน</label>
        <input
          type="password"
          v-model="pass"
          class="form-control"
          placeholder="รหัสผ่าน"
          name="password"
          maxlength="15"
          required
        /><br />
        <div class="text-center">
          <input
            type="submit"
            class="btn btn-primary"
            value="ลงชื่อเข้าใช้งาน"
            @click="login()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: "",
      pass: "",
      info: null,
    };
  },
  created() {
    this.info = JSON.parse(localStorage.getItem("formLogin"));
    if (this.info != null){
      this.$router.push({ name: "main" });
    }
  },
  methods: {
    login() {
      axios
        .post("http://localhost:5000/login", {
          form: {
            user: this.user,
            pass: this.pass,
          },
        })
        .then((response) => {
          const data = response.data;
          if (data.status) {
            let info = {
              s_id: data.ses_id,
              s_user: data.ses_user,
              s_level: data.ses_level,
            };
            let myJSON = JSON.stringify(info);
            localStorage.setItem("formLogin", myJSON);
            if (data.ses_level == "teacher") {
              this.$router.push({ name: "admin" });
            } else if (data.ses_level == "student") {
              this.$router.push({ name: "main" });
            }
          } else {
            alert(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>


<style scoped>
</style>