<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="."> Gracenotes </a>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href=".">ลงชื่อเข้าใช้งาน</a>
          </li>
        </ul>
      </div>
    </nav>
    <br /><br /><br />

    <div class="container">
    <div class="content">
      <h3>ลงทะเบียนเข้าใช้งาน</h3><br>
      <form action="" method="POST" enctype="multipart/form-data">
        <label for="user">รหัสนักเรียน</label>
        <input type="text" class="form-control" placeholder="รหัสนักเรียน" name="user" required>
        <div class="row g-2">
          <div class="col">
            <label for="fname">ชื่อ</label>
            <input type="text" class="form-control" placeholder="ชื่อ" name="fname" maxlength="30" required>
          </div>
          <div class="col">
            <label for="lname">นามสกุล</label>
            <input type="text" class="form-control" placeholder="นามสกุล" name="lname" maxlength="30" required>
          </div>
        </div>
        <label for="class">ชั้นมัธยมศึกษาปีที่</label>
        <input type="text" class="form-control" placeholder="ชั้นมัธยมศึกษาปีที่ ตัวอย่าง 6/6" name="class"
          maxlength="5" required>
        <label for="no">เลขที่</label>
        <input type="number" class="form-control" placeholder="เลขที่" name="no" maxlength="2" min="1" max="99"
          required>
        <label for="dob">วัน/เดือน/ปี เกิด</label>
        <input type="date" class="form-control" name="dob" required>
        <label for="address1">ที่อยู่</label>
        <input type="text" class="form-control" name="address1" placeholder="ที่อยู่ 1" required>
        <input type="text" class="form-control" name="address2" placeholder="ที่อยู่ 2 (ไม่บังคับ)" style="margin-top: 10px;"><br>

        <label for="img">รูปถ่ายนักเรียนแนวตั้ง (.jpg & ขนาดน้อยกว่า 2MB)</label><br>
        <input type="file" id="myFile" name="img"  accept=".jpg" required onchange="preview_image(event)"><br>
        <label for="pass">รหัสผ่าน</label>
        <input type="password" class="form-control" placeholder="รหัสผ่าน" name="pass" maxlength="15" required>
        <label for="repass">ยืนยันรหัสผ่าน</label>
        <input type="password" class="form-control" placeholder="ยืนยันรหัสผ่าน" name="repass" maxlength="15" required><br>
        <div class="text-center"><input type="submit" class="btn btn-success" value="ลงทะเบียน"></div>
      </form>
    </div>
  </div>
  <br><br>

  </div>
</template>
<script>
</script>
<style scoped>
</style>