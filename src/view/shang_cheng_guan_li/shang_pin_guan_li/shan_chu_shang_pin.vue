<template>
  <div>
    
    <Modal v-model="modal12" draggable scrollable title="删除商品">
        <div>是否确认删除“尖的慢大

冰刀”,“测试商品”</div>
    </Modal>
  
  </div>
</template>
<script>
    export default {
        data () {
            return {
                modal12: true,
              
            }
        }
    }
</script>