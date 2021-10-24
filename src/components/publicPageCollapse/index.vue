<template>
  <div class='publicPageCollapse'>
    <el-collapse>
      <el-collapse-item :name='1'>
        <template slot="title">
          <div class='page-collapse-title page-collapse-title_a'>
            <div class='collapse-title-left collapse-title_a'>
              <div class='title-left-icon'></div>
              标的
            </div>
            <div class='collapse-title-right'>
              <div class='title-right-name'>复制上传链接</div>
              <div class='title-right-name'>新增资料类型</div>
            </div>
          </div>
        </template>
        <div class='page-collapse-content' v-for='(item, index) in 2' :key='index'>
          <el-collapse>
            <el-collapse-item :name='1'>
              <template slot="title">
                <div class='page-collapse-title'>
                  <div class='collapse-title-left'>
                    <div class='title-left-icon'></div>
                    车损资料
                  </div>
                  <div class='collapse-title-right'>
                    <div class='title-right-name'>新增物损</div>
                  </div>
                </div>
              </template>
              <div class='collapse-content-list'>
                <div class='collapse-content-item' v-for='(item, index) in 2' :key='index'>
                  <el-collapse>
                    <el-collapse-item :name='1'>
                      <template slot="title">
                        <div class='page-collapse-title'>
                          <div class='collapse-title-left'>
                            <div class='title-left-icon'></div>
                            <div class='title-left-input'> <input type="text" placeholder='物损名称'> </div>
                          </div>
                          <div class='collapse-title-right'>
                            <div class='title-right-name' @click.stop="aaa">删除物损</div>
                          </div>
                        </div>
                      </template>
                      <div class='content-item-list'>
                        <div class='content-list-tab' v-for='(item, index) in 3' :key='index'>
                          <div class='list-tab-header'>
                            <input type="text" placeholder="附件名称">
                            <input type="text" placeholder="备注">
                            <el-checkbox>必填</el-checkbox>
                            <div class='tab-header-add'></div>
                            <div class='tab-header-reduce'></div>
                            <div class='tab-head-upload'>
                              <div class='head-upload-tab'>
                                <input type='file'>
                              </div>
                            </div>
                          </div>
                          <div class='list-tab-file'></div>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames: [1]
    }
  },
  methods: {
    aaa () {
      alert(1234)
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/style/publicPageCollapse.scss';
</style>