<template>
    <div>
        <y-shelf title="收货地址">
            <span slot="right"><y-button text="添加收货地址" style="margin: 0" @btnClick="update()"></y-button></span>
            <div slot="content">

                <div v-if="addList.length">
                    <div class="box-card" v-for="(item,i) in addList" :key="i">
                        <el-card>
                            <div slot="header" class="clearfix">
                                <span class="label">名字</span>
                                <span>{{item.userName}}</span>
                                <el-button style="float: right" type="primary" icon="edit" size="small"
                                           @click="update(item)"></el-button>
                                <el-button style="float: right;;margin-right: 5px" type="danger" icon="delete"
                                           size="small"
                                           :data-id="item.addressId"
                                           @click="del(item.addressId,i)"></el-button>
                            </div>
                            <div class="text item">
                                <span class="label">电话</span>{{item.tel}}
                            </div>
                            <div class="text item">
                                <span class="label">国家</span>{{item.tbCountry ? item.tbCountry.name : '-'}}
                            </div>
                            <div class="text item">
                                <span class="label">城市</span>{{item.tbCity ? item.tbCity.name : '-'}}
                            </div>
                            <div class="text item">
                                <span class="label">街道地址</span>{{item.streetName}}
                                <a @click="changeDef(item)"
                                   href="javascript:;"
                                   v-text="item.isDefault?'( 默认地址 )':'设为默认'"
                                   :class="{'default-address':item.isDefault}">
                                </a>
                            </div>
                        </el-card>
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
                          @btnClick="save({userId:userId,cityId:msg.cityId,addressId:msg.addressId,userName:msg.userName,tel:msg.tel,streetName:msg.streetName,isDefault:msg.isDefault})">
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
                allCountry({mid: getStore('mid'), sign: getStore('sign')}).then(res => {
                    let data = res.result
                    if (data.length) {
                        this.countries = data
                    }
                })
            },
            _citesCountry () {
                citiesCountry({id: this.msg.countryId, mid: getStore('mid'), sign: getStore('sign')}).then(res => {
                    let data = res.result
                    if (data.length) {
                        this.cities = data
                    } else {
                        this.cities = []
                    }
                })
            },
            _addressList () {
                addressList({userId: this.userId, sign: getStore('sign'), mid: getStore('mid')}).then(res => {
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
                params.mid = getStore('mid')
                params.sign = getStore('sign')
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
                p.mid = getStore('mid')
                p.sign = getStore('sign')
                if (p.addressId) {
                    this._addressUpdate(p)
                } else {
                    delete p.addressId
                    this._addressAdd(p)
                }
            },
            // 删除
            del (addressId, i) {
                addressDel({addressId: addressId, mid: getStore('mid'), sign: getStore('sign')}).then(res => {
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
                    this.msg.countryId = item.tbCountry.id
                    this.msg.cityId = item.tbCity.id
                    this._citesCountry()
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

    .default-address {
        color: #626262;
        display: inline;
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

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 50%;
        padding: 5px 5px;
        display: inline-block;
    }

    .label {

        display: inline-block;
        height: 22px;
        line-height: 22px;
        margin: 2px 4px 2px 0;
        padding: 0 8px;
        border: 1px solid #e8eaec;
        border-radius: 3px;
        background: #f7f7f7;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;
    }
</style>
