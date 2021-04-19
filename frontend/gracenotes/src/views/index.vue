<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container">
      <a class="navbar-brand" href=".">
        Gracenotes
      </a>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="register">ลงทะเบียนเข้าใช้งาน</a>
        </li>
      </ul>
    </div>
  </nav>
  <br><br><br>
  <div class="container">
    <div class="content">
      <h3>ลงชื่อเข้าใช้งาน</h3><br>
        <label for="user">รหัสนักเรียน</label>
        <input type="text" v-model="user" class="form-control" placeholder="รหัสนักเรียน" name="user" maxlength="10" required>
        <label for="password">รหัสผ่าน</label>
        <input type="password" v-model="pass" class="form-control" placeholder="รหัสผ่าน" name="password" maxlength="15" required><br>
        <div class="text-center"><input type="submit" class="btn btn-primary" value="ลงชื่อเข้าใช้งาน" ></div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
        user: '',
        pass: '',
    };
  },
  methods: {
      submitLogin(){
          
      }
  }
}

</script>


<style scoped>
</style>