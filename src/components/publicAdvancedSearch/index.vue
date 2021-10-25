<template>
  <div class="advanced-search">
    <el-drawer title="高级筛选" :visible.sync="drawer" size='420px' :direction="direction" :before-close="handleClose">
      <div class="advanced-search-list">
        <div class="search-list-item" v-for='(item, index) in listData' :key='index'>
          <div class="list-item-label">{{ item.name}}:</div>
          <div class="list-item-input">
            <template v-if='item.type === "input"'>
              <el-input v-model='item.model' :placeholder="`请输入${item.name}`"></el-input>
            </template>
            <template v-if='item.type === "daterange"'>
              <el-date-picker v-model="item.model" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </template>
          </div>
        </div>
        <div class="search-list-button">
          <el-button size="medium" type="primary" @click="confirm">确认</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'listData',
    event: 'upDateInfoData'
  },
  watch: {
    listData: {
      handler () {
        this.$emit('upDateInfoData',this.infoData)
      },
      deep: true
    }
  },
  props: {
    listData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      drawer: true,
      direction: 'rtl',
    }
  },
  methods: {
    handleClose () {
      this.$emit('operati', 'close')
    },
    confirm () {
      this.$emit('operati', 'confirm')
    },
  }
}
</script>

<style lang='scss' scoped>
.advanced-search {
  .advanced-search-list {
    padding: 0 20px;
    .search-list-item {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .list-item-label {
        flex: 0 0 auto;
        min-width: 80px;
        font-size: 13px;
        color: #333333;
        text-align: right;
        line-height: normal;
      }
      .list-item-input {
        flex: 1;
        margin-left: 15px;
      }
    }
    .search-list-button {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;

    }
  }
  ::v-deep .el-drawer__header {
    margin: 0;
  }
}
</style>