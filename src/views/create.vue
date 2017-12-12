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
                <p>tips: 封面图最佳尺寸为950 * 295</p>
                <input type="file" name="avatar" accept="images/jpg, image/gif, image/jpeg, image/png" @change="onSelected">
                <!-- <Upload action="//localhost:8888/uploadImage" :on-success="lookUploaded" :on-preview="lookUploaded">
                    <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                </Upload> -->
                <div class="image-preview mt15" :style="{backgroundImage: `url(${article.image})`}" alt=""></div>
            </FormItem>

            <div id="editor">
                <mavon-editor ref="mdEditor" @imgAdd="imgAdd" @change="editorChange" :ishljs="true" style="height: 100%" @save="onSaveArticle"></mavon-editor>
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

import { publishArticle, uploadPics } from 'apis';

export default {
    name: "create-article",

    data () {
        return {
            article: {
                title: null,
                content: '',
                image: '',
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

            if(!this.article.title){
                this.$Message.error("请填写文章标题");
                return;
            }
            if(!this.article.tags){
                this.$Message.error("请填写文章标签");
                return;
            }
            if(!this.article.image){
                this.$Message.error("请上传文章封面图");
                return;
            }
            if(!this.article.content){
                this.$Message.error("请填写文章文章内容");
                return;
            }

            this.draftLoading = true;            

            publishDraft({
                title: this.article.title,
                content: this.article.content,
                image: this.article.image,
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

            if(!this.article.title){
                this.$Message.error("请填写文章标题");
                return;
            }
            if(!this.article.tags){
                this.$Message.error("请填写文章标签");
                return;
            }
            if(!this.article.image){
                this.$Message.error("请上传文章封面图");
                return;
            }
            if(!this.article.content){
                this.$Message.error("请填写文章文章内容");
                return;
            }

            this.submitLoading = true;            
            
            publishArticle({
                title: this.article.title,
                content: this.article.content,
                image: this.article.image,
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
        lookUploaded(url, file){
            console.log(url, file);
        },

        // 本地已选中文件
        onSelected(e){
            if(e.target.files.length > 0) {
                let file = e.target.files[0],
                    fileName = file.name,
                    fileSize = file.size,
                    ileType = file.type;

                let data = new FormData();

                data.append('avatar', file);
                uploadPics(data).then(res => (this.article.image = res.data.src));
            }
        },

        // 编辑器添加图片
        imgAdd(pos, file){
            console.log(pos, file);
            // 第一步.将图片上传到服务器.
            let data = new FormData();
            data.append('avatar', file);

            let editor = this.$refs.mdEditor;

            console.log('data', data);
            uploadPics(data).then(res => {
                // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
                editor.$img2Url(pos, res.data.src);
            });
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
