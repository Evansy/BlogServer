<template>
   <div class="create-article">
       <Form :model="article" label-position="top">
            <FormItem label="标题">
                <Input v-model="article.title"></Input>
            </FormItem>
            <FormItem label="发布时间">
                <Input v-model="article.time"></Input>
            </FormItem>
            <!-- <FormItem label="Aligned title">
                <Input v-model="formTop.input3"></Input>
            </FormItem> -->
            <div id="editor">
                <mavon-editor style="height: 100%" @save="onSaveArticle"></mavon-editor>
            </div>
        </Form>
   </div>
</template>

<script>
// Local Registration
import { mavonEditor } from 'mavon-editor';
// 可以通过 mavonEditor.markdownIt 获取解析器markdown-it对象
import 'mavon-editor/dist/css/index.css';

export default {
    name: "create-article",
    data () {
        return {
            article: {
                title: null,
                time: null
            }
        }
    },
    components: {
        mavonEditor
    },
    methods:{
        onSaveArticle(textVlue, htmlValue){
            console.log(textVlue, htmlValue);
        }
    }
}
</script>

<style lang="scss">
//    @import "~scss/views/create";
#editor {
    // margin: auto;
    // width: 80%;
    height: 580px;
}
</style>
