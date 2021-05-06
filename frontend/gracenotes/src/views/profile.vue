<template>
  <div>
    <!--NavBar-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="/main">
          <img
            src="../assets/logo.png"
            alt=""
            width="40"
            height="40"
            class="d-inline-block align-center"
          />
          Gracenotes
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse text-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="/main"
                ><i class="fas fa-home"></i> หน้าแรก</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/grace"
                ><i class="fas fa-address-book"></i>
                บันทึกความดีกิจกรรมเพื่อสังคมและสาธารณะประโยชน์</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/report"
                ><i class="fas fa-bug"></i> รายงานปัญหา</a
              >
            </li>

            <li class="nav-item" v-if="info.member_level == 'teacher'">
              <a class="nav-link text-danger" href="/admin"
                ><i class="fas fa-asterisk"></i> Admin Panel</a
              >
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown dropstart">
              <a
                class="nav-link"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  :src="'http://localhost:5000' + info.member_img"
                  alt=""
                  style="border-radius: 8px"
                  width="30"
                  height="35"
                />
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="/mygrace"
                    >บันทึกความดีของฉัน</a
                  >
                </li>
                <li><a class="dropdown-item" href="/profile">การตั้งค่า</a></li>
                <li>
                  <div class="dropdown-divider"></div>
                </li>
                <li>
                  <a class="dropdown-item"
                    >{{ info.member_fname }} {{ info.member_lname }}
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/logout"
                    ><span class="text-danger">ออกจากระบบ</span></a
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <br /><br /><br />

    <div class="container">
      <p class="text-center">
        <a
          :href="'http://localhost:5000' + formMembers.member_img"
          target="_blank"
          ><img
            :src="'http://localhost:5000' + formMembers.member_img"
            class="img-fluid"
            style="border-radius: 8px; width: 25%"
            alt=""
        /></a>
      </p>
      <div class="content mx-auto col-lg-7 col-md-12 col-sm-12">
        <h3>แก้ไขข้อมูลบัญชีผู้ใช้</h3>
        <label for="id">รหัสนักเรียน</label>
        <input
          type="text"
          v-model="formMembers.member_user"
          class="form-control"
          name="id"
          value=""
          readonly
          placeholder="รหัสนักเรียน"
          maxlength="10"
        />
        <div class="row g-2">
          <div class="col">
            <label for="fname">ชื่อ</label>
            <input
              type="text"
              v-model="$v.fname.$model"
              :class="{ 'is-danger text-danger': $v.fname.$error }"
              class="form-control"
              name="fname"
              value=""
              placeholder="ชื่อ"
              maxlength="30"
              required
            />
            <template v-if="$v.fname.$error">
              <p class="help text-danger" v-if="!$v.fname.required">
                This field is required
              </p>
              <p class="help text-danger" v-if="!$v.fname.maxLength">
                This field can contain only 30 characters
              </p>
              <p class="help text-danger" v-if="!$v.fname.fullname">
                No numeric allowed
              </p>
            </template>
          </div>
          <div class="col">
            <label for="lname">นามสกุล</label>
            <input
              type="text"
              v-model="$v.lname.$model"
              :class="{ 'is-danger text-danger': $v.lname.$error }"
              class="form-control"
              name="lname"
              placeholder="นามสกุล"
              maxlength="30"
              required
            />

            <template v-if="$v.lname.$error">
              <p class="help text-danger" v-if="!$v.lname.required">
                This field is required
              </p>
              <p class="help text-danger" v-if="!$v.lname.maxLength">
                This field can contain only 30 characters
              </p>
              <p class="help text-danger" v-if="!$v.lname.fullname">
                No numeric allowed
              </p>
            </template>
          </div>
        </div>
        <label for="class">ห้องเรียน</label>
        <input
          type="text"
          v-model="$v.class.$model"
          :class="{ 'is-danger text-danger': $v.class.$error }"
          class="form-control"
          name="class"
          value=""
          placeholder="ห้องเรียน"
          maxlength="3"
          required
        />
        <template v-if="$v.class.$error">
          <p class="help text-danger" v-if="!$v.class.required">
            This field is required
          </p>
          <p class="help text-danger" v-if="!$v.class.classes">
            Please Insert class correctly
          </p>
        </template>
        <label for="no">เลขที่</label>
        <input
          type="text"
          v-model="$v.no.$model"
          :class="{ 'is-danger text-danger': $v.no.$error }"
          class="form-control"
          placeholder="เลขที่ เช่น 5, 34"
          name="no"
          min="1"
          max="99"
          required
        />
        <template v-if="$v.no.$error">
          <p class="help text-danger" v-if="!$v.no.required">
            This field is required
          </p>
          <p
            class="help text-danger"
            v-if="!$v.no.numeric || !$v.no.maxLength || !$v.no.no3"
          >
            Please Insert number correctly (2 digits)
          </p>
          <p class="help text-danger" v-if="!$v.no.no2">
            Limit number at 60 only
          </p>
        </template>
        <label for="dob">วัน/เดือน/ปี เกิด</label>
        <input
          type="date"
          v-model="$v.dob.$model"
          :class="{ 'is-danger text-danger': $v.dob.$error }"
          class="form-control"
          name="dob"
          value=""
          placeholder="วัน/เดือน/ปี เกิด"
          required
        />
        <template v-if="$v.dob.$error">
          <p class="help text-danger" v-if="!$v.dob.required">
            This field is required
          </p>
          <p class="help text-danger" v-if="!$v.dob.maxValue">
            Please Insert Date correctly
          </p>
        </template>
        <label for="address">ที่อยู่</label>
        <input
          type="text"
          v-model="$v.address.$model"
          :class="{ 'is-danger text-danger': $v.address.$error }"
          class="form-control"
          name="address"
          value=""
          placeholder="ที่อยู่"
          required
        />
        <template v-if="$v.address.$error">
          <p class="help text-danger" v-if="!$v.address.required">
            This field is required
          </p>
        </template>
        <label for="pass">รหัสผ่านเดิม</label>
        <input
          type="password"
          v-model="$v.oldpass.$model"
          :class="{ 'is-danger text-danger': $v.oldpass.$error }"
          class="form-control"
          name="oldpass"
          placeholder="รหัสผ่านเดิม"
          required
        />
        <template v-if="$v.oldpass.$error">
          <p class="help text-danger" v-if="!$v.oldpass.required">
            This field is required
          </p>
        </template>
        <label for="pass">รหัสผ่านใหม่</label>
        <input
          type="password"
          v-model="$v.pass.$model"
          :class="{ 'is-danger text-danger': $v.pass.$error }"
          class="form-control"
          name="pass"
          placeholder="รหัสผ่านใหม่"
          required
        />
        <template v-if="$v.pass.$error">
          <p class="help text-danger" v-if="!$v.pass.required">
            This field is required
          </p>
          <p class="help text-danger" v-if="!$v.pass.pass">
            Password must be harder (include Capital letter, Alphabet ,number)
          </p>
          <p class="help text-danger" v-if="!$v.pass.minLength">
            Password must contain at least 5 character
          </p>
        </template>
        <label for="repass">ยืนยันรหัสผ่านใหม่</label>
        <input
          type="password"
          v-model="$v.repass.$model"
          :class="{ 'is-danger text-danger': $v.repass.$error }"
          class="form-control"
          name="repass"
          placeholder="ยืนยันรหัสผ่านใหม่"
          required
        />
        <template v-if="$v.repass.$error">
          <p class="help text-danger" v-if="!$v.repass.required">
            This field is required
          </p>
          <p class="help text-danger" v-if="!$v.repass.repass">
            Muse be the same as password
          </p>
        </template>
        <br />
        <p class="text-center">
          <input
            type="submit"
            class="btn btn-info"
            value="อัปเดต"
            @click="validate()"
          />
        </p>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  sameAs,
  numeric,
} from "vuelidate/lib/validators";
import axios from "axios";

function classes(value) {
  return !!value.match(/[1-6]{1}[/]{1}[1-8]{1}/);
}
function no2(value) {
  return !(parseInt(value) > 60);
}
function no3(value) {
  return !(value[0] == "0");
}
function pass(value) {
  if (!(value.match(/[0-9]/) && value.match(/[a-z]/) && value.match(/[A-Z]/))) {
    return false;
  }
  return true;
}
function fullname(value) {
  if (value.match(/[0-9]/)) {
    return false;
  }
  return true;
}

export default {
  data() {
    return {
      info: null,
      formMembers: "",
      fname: "",
      lname: "",
      class: "",
      no: "",
      dob: "",
      address: "",
      oldpass: "",
      verifypass: "",
      pass: "",
      repass: "",
    };
  },

  validations: {
    fname: {
      required,
      maxLength: maxLength(30),
      fullname: fullname,
    },
    lname: {
      required,
      maxLength: maxLength(30),
      fullname: fullname,
    },
    class: {
      required,
      classes: classes,
    },
    no: {
      required,
      numeric: numeric,
      no2: no2,
      no3: no3,
      maxLength: maxLength(2),
      minLength: minLength(1),
    },
    dob: {
      required,
      maxValue: (value) => value < new Date().toISOString(),
    },
    address: {
      required,
    },
    oldpass: {
      required,
    },
    pass: {
      required,
      maxLength: maxLength(50),
      pass: pass,
    },
    repass: {
      required,
      repass: sameAs("pass"),
    },
  },

  created() {
    this.info = JSON.parse(localStorage.getItem("formLogin"));
    if (this.info == null) {
      this.$router.push({ name: "index" });
    }
    axios
      .get(`http://localhost:5000/user/${this.info.s_id}`)
      .then((response) => {
        let data = response.data;
        //copy data
        this.info = { ...data };
        this.formMembers = {
          ...data,
        };
        // iso date to short date
        this.formMembers.member_dob = this.formMembers.member_dob.substr(0, 10);
        this.fname = this.formMembers.member_fname;
        this.lname = this.formMembers.member_lname;
        this.class = this.formMembers.member_class;
        this.no = this.formMembers.member_no;
        this.dob = this.formMembers.member_dob;
        this.address = this.formMembers.member_address;
        this.verifypass = this.formMembers.member_password;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    update() {
      axios
        .put(`http://localhost:5000/user`, {
          form: this.formMembers,
        })
        .then((response) => {
          let data = response.data;
          alert(data.message);
          this.$router.push({ name: "logout" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.formMembers.member_fname = this.fname;
        this.formMembers.member_lname = this.lname;
        this.formMembers.member_class = this.class;
        this.formMembers.member_no = this.no;
        this.formMembers.member_dob = this.dob;
        this.formMembers.member_address = this.address;
        this.formMembers.member_password = this.pass;
        this.formMembers.sid = this.formMembers.member_id;
        if (this.verifypass != this.oldpass) {
          alert("โปรดใส่รหัสผ่านเดิมให้ถูกต้อง");
          return;
        }
        this.update();
      }
    },
  },
};
</script>

<style scoped>
</style>