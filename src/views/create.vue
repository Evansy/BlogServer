<template>
   <div class="create-article">
       <Form :model="article" label-position="top">
            <FormItem label="标题">
                <Input v-model="article.title"></Input>
            </FormItem>

            <FormItem label="标签">
                <Input v-model="article.tags" style="width:260px"></Input>
            </FormItem>

            <div id="editor">
                <mavon-editor style="height: 100%" @save="onSaveArticle"></mavon-editor>
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
import { mavonEditor } from 'mavon-editor';
// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
import 'mavon-editor/dist/css/index.css';

import { publishArticle } from 'apis';

export default {
    name: "create-article",
    data () {
        return {
            article: {
                title: null,
                tagList: [
                    {
                        value: '',
                        label: 'javascript'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    }
                ],
                tags: ''
            },
            draftLoading: false,
            submitLoading: false,
        }
    },
    components: {
        mavonEditor
    },
    methods:{
        onSaveArticle(textVlue, htmlValue){
            console.log(textVlue, htmlValue);
        },

        saveDraft() {
            this.draftLoading = true;

            setTimeout(() => {
                this.draftLoading = false;
            }, 2000);
        },

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
                this.$Message.success("发布失败");
                console.log(err);
                this.submitLoading = false;
            })

            // setTimeout(() => {
            //     this.submitLoading = false;
            // }, 2000);
        }
    }
}
</script>

<style lang="scss">
   @import "~scss/views/create";
</style>
