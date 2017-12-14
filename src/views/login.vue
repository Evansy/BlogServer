<template>
    <div class="views-login">
        <div class="views-login-bg"></div>
        <div class="first-page-bgcover"></div>
        <div class="view-login-box">
            <h3 class="font-blue mb20 f24">
                <img src="~assets/favicon.ico" alt=""><br>
                Evan's Secret Garden
            </h3>
            <i-form ref="formInline" :model="formInline" :rules="ruleInline">
                <Form-item prop="user">
                    <i-input size="large" type="text" v-model="formInline.username" placeholder="Username">
                        <Icon size="22" type="ios-person-outline" slot="prepend"></Icon>
                    </i-input>
                </Form-item>
                <Form-item prop="password">
                    <i-input size="large" type="password" v-model="formInline.password" placeholder="Password">
                        <Icon size="22" type="ios-locked-outline" slot="prepend"></Icon>
                    </i-input>
                </Form-item>
                <Form-item>
                    <i-button size="large" type="primary" @click="handleSubmit('formInline')">登录</i-button>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
import { login } from 'apis';
import member from 'utils/member';

export default {
    name: "login",
    data () {
        return {
            formInline: {
                username: 'yingzi',
                password: 'jmpwfYZ'
            },
            ruleInline: {
                user: [
                    { required: false, message: '请填写用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.onLogin();
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },

        onLogin(){
            login({
                username: this.formInline.username,
                password: this.formInline.password
            }).then(res => {
                this.$Message.success('登录成功!');
                member.setCredential(res);
                this.$router.push('/views');
            })
        }
    }
 }
</script>

<style lang="scss">
    @import "~scss/views/login";
</style>
