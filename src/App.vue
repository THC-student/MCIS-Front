<template>
  <router-view></router-view>
</template>
<script setup>
import {onMounted} from 'vue'
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
onMounted(()=>{
  console.log(localStorage.getItem("id"),"122222")
  store.state.userId= localStorage.getItem("id")
  store.dispatch("userLogin",{username:localStorage.getItem("account"),password:localStorage.getItem("password"),option:localStorage.getItem("option")})
  // 使用示例  
const keysIWantToKeep = ['account', 'password','identity','cachedMonthSammary']; // 替换为你想保留的键的数组  
keepOnlySpecifiedKeysInSessionStorage(keysIWantToKeep);
})
function keepOnlySpecifiedKeysInSessionStorage(keysToKeep) {  
  // 获取sessionStorage中所有的键  
  const allKeys = Object.keys(sessionStorage);  
  
  // 遍历所有键  
  for (let i = 0; i < allKeys.length; i++) {  
    const key = allKeys[i];  
    // 如果键不在要保留的键数组中，则删除它  
    if (!keysToKeep.includes(key)) {  
      sessionStorage.removeItem(key);  
    }  
  }  
}  
  

</script>

