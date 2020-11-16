<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          个人中心
          <!-- <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge> -->
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import untilMd5 from "../../../../utils/md5";
import "./user.less";
import { mapActions } from "vuex";
export default {
  name: "User",
  props: {
    userAvatar: {
      type: String,
      default: "",
    },
    messageUnreadCount: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    logout() {
      // this.handleLogOut().then(() => {
        let params = {
          userId: JSON.parse(localStorage.user).id,
        };
        this.axios
          .post("/api/v2/manage/system/userLogout", {
            ...params,
            sign: untilMd5.toSign({ ...params }, "userLogout"),
          })
          .then((res) => {
            if (res.data.code === 200) {
              localStorage.clear()
              sessionStorage.clear()
                            this.$router.replace({
                name: "login",
              });
            }else{
              this.$Message.info('系统出错，请稍后重试')
              
            }
            console.log(res.data.code);
          // });
      });
    },
    message() {
      this.$router.push("/homeAdmin/ge_ren_zhong_xin");
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
      }
    },
  },
};
</script>
