<template>
  <div>
    <img
      src="../assets/井盖（界面）.png"
      style="width: 42px; position: absolute; top: 3px; left: 12px"
    />
    <h2>井&nbsp;盖&nbsp;检&nbsp;测</h2>
  </div>
  <hr style="border: 0.5px solid #d9ecff; position: relative; top: 42px" />
  <UserInformation style=" width:200px;position: absolute;top:80px;left:0px;"/>
  <template v-if="identity === '用户'">
      <UserMenu />
    </template>
    <template v-else-if="identity === '管理员'">
      <RulerMenu style="position: relative;top:210px;"/>
    </template>
  <!-- <UserMenu/> -->
</template>


<script name="Aside" setup>
import UserInformation from '../LeftComponent/UserInformation.vue'
import UserMenu from '../LeftComponent/UserMenu.vue'
import RulerMenu from '../LeftComponent/RulerMenu.vue'
import { useStore } from 'vuex'
const store = useStore();
const identity=localStorage.getItem('identity')
/* console.log(localStorage.getItem('identity'))
console.log(identity) */
</script>



<style scoped>
h2 {
  position: absolute;
  top: -10px;
  left: 65px;
  font-size: 21px;
  color: #409eff;
}
</style>./Aside.vue