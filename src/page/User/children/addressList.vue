<template>
  <div>
    <y-shelf title="收货地址">
      <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
      <div slot="content">
        <!--标题-->
        <div class="table-title">
          <span class="name">姓名</span> <span class="address">详细地址</span> <span class="tel">电话</span>
        </div>
        <div v-if="addList.length">
          <div class="address-item" v-for="(item,i) in addList" :key="i">
            <div class="name">{{item.userName}}</div>
            <div class="address-msg">{{item.streetName}}</div>
            <div class="telephone">{{item.tel}}</div>
            <div class="defalut">
              <a @click="changeDef(item)"
                 href="javascript:;"
                 v-text="item.isDefault?'( 默认地址 )':'设为默认'"
                 :class="{'defalut-address':item.isDefault}"></a>
            </div>
            <div class="operation">
              <el-button type="primary" icon="edit" size="small" @click="update(item)"></el-button>
              <el-button type="danger" icon="delete" size="small" :data-id="item.addressId"
                         @click="del(item.addressId,i)"></el-button>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="padding: 80px 0;text-align: center">
            <div style="font-size: 20px">你还未添加收货地址</div>
            <div style="margin: 20px ">
              <y-button text="添加地址" @btnClick="update()"></y-button>
            </div>
          </div>
        </div>
      </div>
    </y-shelf>
    <y-popup :open="popupOpen" @close='popupOpen=false' :title="popupTitle">
      <div slot="content" class="md" :data-id="msg.addressId">
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="msg.userName"
            clearable>
          </el-input>
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="msg.tel"
            clearable>
          </el-input>
        </div>
        <div>
          <el-select v-model="msg.countryId" placeholder="请选择国家" @change="updateCitesCountry">
            <el-option v-for="item in countries" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="msg.cityId" placeholder="请选择城市">
            <el-option v-for="item in cities" :key="item.id" :label="item.stateOfCity" :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            placeholder="请输入内容"
            v-model="msg.streetName"
            clearable>
          </el-input>
        </div>

        <div>
          <el-checkbox class="auto-login" v-model="msg.isDefault">设为默认</el-checkbox>
        </div>
        <y-button text='保存'
                  class="btn"
                  :classStyle="btnHighlight?'main-btn':'disabled-btn'"
                  @btnClick="save({userId:userId,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,isDefault:msg.isDefault})">
        </y-button>
      </div>
    </y-popup>
  </div>
</template>
<script>
  import {addressList, addressUpdate, addressAdd, addressDel, allCountry, citiesCountry} from '/api/goods'
  import YButton from '/components/YButton'
  import YPopup from '/components/popup'
  import YShelf from '/components/shelf'
  import {getStore} from '/utils/storage'

  export default {
    data () {
      return {
        addList: [],
        popupOpen: false,
        popupTitle: '管理收货地址',
        msg: {
          countryId: '',
          cityId: '',
          addressId: '',
          userName: '',
          tel: '',
          streetName: '',
          isDefault: false
        },
        userId: '',
        countries: [],
        cities: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    computed: {
      btnHighlight () {
        let msg = this.msg
        return msg.userName && msg.tel && msg.streetName
      }
    },
    methods: {
      message (m) {
        this.$message.error({
          message: m
        })
      },
      _getALLCountry () {
        allCountry({}).then(res => {
          let data = res.result
          if (data.length) {
            this.countries = data
          }
        })
      },
      _citesCountry () {
        citiesCountry({id: this.msg.countryId}).then(res => {
          let data = res.result
          if (data.length) {
            this.cities = data
          } else {
            this.cities = []
          }
        })
      },
      _addressList () {
        addressList({userId: this.userId}).then(res => {
          let data = res.result
          if (data.length) {
            this.addList = res.result
            this.addressId = res.result[0].addressId || '1'
          } else {
            this.addList = []
          }
        })
      },
      _addressUpdate (params) {
        addressUpdate(params).then(res => {
          this._addressList()
        })
      },
      _addressAdd (params) {
        addressAdd(params).then(res => {
          if (res.success === true) {
            this._addressList()
          } else {
            this.message(res.message)
          }
        })
      },
      changeDef (item) {
        if (!item.isDefault) {
          item.isDefault = true
          this._addressUpdate(item)
        }
        return false
      },
      // 保存
      save (p) {
        this.popupOpen = false
        if (p.addressId) {
          this._addressUpdate(p)
        } else {
          delete p.addressId
          this._addressAdd(p)
        }
      },
      // 删除
      del (addressId, i) {
        addressDel({addressId: addressId}).then(res => {
          if (res.success === true) {
            this.addList.splice(i, 1)
          } else {
            this.message('删除失败')
          }
        })
      },
      // 修改
      update (item) {
        this.popupOpen = true
        if (item) {
          this.popupTitle = '管理收货地址'
          this.msg.userName = item.userName
          this.msg.tel = item.tel
          this.msg.streetName = item.streetName
          this.msg.isDefault = item.isDefault
          this.msg.addressId = item.addressId
        } else {
          this.popupTitle = '新增收货地址'
          this.msg.userName = ''
          this.msg.tel = ''
          this.msg.streetName = ''
          this.msg.isDefault = false
          this.msg.addressId = ''
        }
      },
      // 选择国家之后获取国家下的城市
      updateCitesCountry () {
        this._citesCountry()
      }
    },
    created () {
      this.userId = getStore('userId')
      this._addressList()
      this._getALLCountry()
    },
    components: {
      YButton,
      YPopup,
      YShelf
    }
  }
</script>
<style scoped lang="scss">
  .table-title {
    position: relative;
    z-index: 1;
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 38px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
    .name {
      float: left;
      text-align: left;
    }
    span {
      width: 137px;
      float: left;
      text-align: center;
      color: #838383;
    }
    .address {
      margin-left: 115px;
    }
    .tel {
      margin-left: 195px;
    }
  }

  .address-item {
    display: flex;
    align-items: center;
    height: 115px;
    text-align: center;
    .name {
      width: 106px;
    }
    .address-msg {
      flex: 1;
    }
    .telephone {
      width: 160px;
    }
    .defalut {
      width: 80px;
      > a {
        text-align: center;
        /*display: none;*/
      }
    }
    .operation {
      width: 135px;
      a {
        padding: 10px 5px;
      }
    }
    &:hover {
      .defalut > a {
        display: block;
      }
    }
  }

  .address-item + .address-item {
    border-top: 1px solid #CFCFCF;
  }

  .defalut-address {
    color: #626262;
    display: block;
    pointer-events: none;
    cursor: default;
  }

  .md {
    > div {
      text-align: left;
      margin-bottom: 15px;
      > input {
        width: 100%;
        height: 50px;
        font-size: 18px;
        padding: 10px 20px;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 3px 5px -4px rgba(0, 0, 0, .4) inset, -1px 0 3px -2px rgba(0, 0, 0, .1) inset;
        line-height: 46px;
      }
    }
  }

  .btn {
    margin: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    line-height: 48px
  }
</style>
