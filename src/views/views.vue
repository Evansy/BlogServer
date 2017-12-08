<template>
   <div class="views-layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row class="views-row" type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="create" theme="dark" width="auto" @on-select="onMenuSelect">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="create">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text">发布日志</span>
                    </MenuItem>
                    <MenuItem name="manage">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">管理日志</span>
                    </MenuItem>
                    <MenuItem name="draft">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text">草稿列表</span>
                    </MenuItem>
                    <MenuItem name="setting">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text">设置</span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col class="views-col-content" :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <!-- <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <BreadcrumbItem href="#">Index</BreadcrumbItem>
                        <BreadcrumbItem href="#">Apps</BreadcrumbItem>
                        <BreadcrumbItem>App</BreadcrumbItem>
                    </Breadcrumb>
                </div> -->
                <div class="layout-content">
                    <div class="layout-content-main">
                        <!-- router-view 路由切换 BEGIN -->
                        <transition name="router-fade" mode="out-in">
                            <router-view/>
                        </transition>
                        <!-- router-view 路由切换 END -->
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2017 &copy; Evan、
                </div>
            </Col>
        </Row>
   </div>
</template>

<script>
export default {
    name: "views",
    data () {
        return {
            spanLeft: 5,
            spanRight: 19
        }
    },
    computed:{
        iconSize () {
            return this.spanLeft === 5 ? 14 : 24;
        }
    },
    methods: {
        toggleClick () {
            if (this.spanLeft === 5) {
                this.spanLeft = 2;
                this.spanRight = 22;
            } else {
                this.spanLeft = 5;
                this.spanRight = 19;
            }
        },

        // 选中菜单时的事件
        onMenuSelect(pathname){
            if(this.$route.path !== `/${pathname}`){
                this.$router.push(`/${pathname}`);
            }
        }
    }
}
</script>

<style lang="scss">
   @import "~scss/views/views";
</style>
