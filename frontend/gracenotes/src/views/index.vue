<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href=".">
          <img
            src="../assets/logo.png"
            alt=""
            width="40"
            height="40"
            class="d-inline-block align-center"
          />
          Gracenotes </a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/register">ลงทะเบียนเข้าใช้งาน</a>
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
          v-model="$v.user.$model" :class="{'is-danger text-danger': $v.user.$error}"
          class="form-control"
          placeholder="รหัสนักเรียน"
          name="user"
          required
        />
        <template v-if="$v.user.$error">
          <p class="help text-danger" v-if="!$v.user.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.user.maxLength">This field can contain only 10 characters</p>
          <p class="help text-danger" v-if="!$v.user.numeric">This field can contain number only</p>
        </template>
        <label for="password">รหัสผ่าน</label>
        <input
          type="password"
          v-model="$v.pass.$model" :class="{'is-danger text-danger': $v.pass.$error}"
          class="form-control"
          placeholder="รหัสผ่าน"
          name="password"
          required
        />
        <template v-if="$v.pass.$error">
          <p class="help text-danger" v-if="!$v.pass.required">This field is required</p>
          <p class="help text-danger" v-if="!$v.pass.maxLength">This field can contain only 30 characters</p>
        </template>
        <br />
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
import {required, maxLength, numeric} from 'vuelidate/lib/validators'
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
  validations:{
    user:{
      required,
      numeric: numeric,
      maxLength: maxLength(10),
    },
    pass:{
      required,
      maxLength: maxLength(30)
    }

  },
  methods: {
    login() {

      this.$v.$touch();

      if(!this.$v.$invalid){
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
    }
    else if(!this.$v.user.required && !this.$v.pass.required){
      alert("Please Insert User ID and Password ")
    }
    else if(!this.$v.user.required){
      alert("Please Insert User ID")
    }
    else if(!this.$v.pass.required){
      alert("Please Insert Password")
    }

      }

      



      
  },
};
</script>


<style scoped>
</style>