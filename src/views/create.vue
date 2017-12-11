<template>
   <div class="create-article">
       <Form :model="article" label-position="top">
            <FormItem label="标题">
                <Input v-model="article.title"></Input>
            </FormItem>

            <FormItem label="标签">
                <Input v-model="article.tags" style="width:260px"></Input>
            </FormItem>

            <FormItem label="封面图">
                <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="lookUploaded" :on-preview="lookUploaded">
                    <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload>
            </FormItem>

            <div id="editor">
                <mavon-editor @change="editorChange" :ishljs="true" style="height: 100%" @save="onSaveArticle"></mavon-editor>
            </div>

            <div class="options-button">
                <Button type="primary" :loading="draftLoading" @click="saveDraft">
                    <span v-if="!draftLoading">保存草稿</span>
                    <span v-else>保存中...</span>
                </Button>

                <Button type="primary" :loading="submitLoading" @click="toSubmit">
                    <span v-if="!submitLoading">提交</span>
                    <span v-else>提交中...</span>
                </Button>
            </div>

        </Form>
   </div>
</template>

<script>
// Local Registration
import { mavonEditor, publishDraft } from 'mavon-editor';

// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
import 'mavon-editor/dist/css/index.css';

import { publishArticle } from 'apis';

export default {
    name: "create-article",

    data () {
        return {
            article: {
                title: null,
                content: '',
                tags: 'js'
            },
            draftLoading: false,
            submitLoading: false,
        }
    },

    components: {
        mavonEditor
    },

    methods:{

        // 点击保存按钮
        onSaveArticle(textVlue, htmlValue){
            console.log(textVlue, htmlValue);
        },

        // 保存草稿
        saveDraft() {
            this.draftLoading = true;

            publishDraft({
                title: this.article.title,
                content: this.article.content,
                tags: this.article.tags
            }).then(res => {
                console.log(res);
                this.$Message.success("保存草稿成功");
                this.draftLoading = false;
            }).catch(err => {
                this.$Message.error("保存草稿失败");
                console.log(err);
                this.draftLoading = false;
            });
        },

        // 编辑器内容发生变化时触发
        editorChange(textVlue, htmlValue){
            this.article.content = htmlValue;
        },

        // 发布文章
        toSubmit() {
            this.submitLoading = true;

            publishArticle({
                title: this.article.title,
                content: this.article.content,
                tags: this.article.tags
            }).then(res => {
                console.log(res);
                this.$Message.success("发布成功");
                this.submitLoading = false;
            }).catch(err => {
                this.$Message.error("发布失败");
                console.log(err);
                this.submitLoading = false;
            });
        },

        // 查看已上传的图片文件。
        lookUploaded(url){
            console.log(url);
        }

        // 清空页面数据
        // refresh(){

        // }
    }
}
</script>

<style lang="scss">
   @import "~scss/views/create";
</style>
