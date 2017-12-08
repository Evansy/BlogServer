<template>
   <div class="article-manage">
       <Table border :columns="draftColumns" :data="draftDatas"></Table>
   </div>
</template>

<script>
import { draftList } from 'apis';

export default {
    name: "article-manage",
    data () {
        return {
            draftColumns: [
                {
                    title: '标题',
                    key: 'title',
                    // sortable: true
                },
                {
                    title: '时间',
                    key: 'date',
                    sortable: true
                },
                {
                    title: '标签',
                    key: 'tags'
                    
                },
                {
                    title: '是否发布',
                    key: 'isPublish',
                    align: 'center',
                    render: (h, params) => {
                        return h('div', {}, params.row.isPublish ? '是' : '否');
                    }
                }
            ],
            draftDatas: []
        }
    },
    created(){
        this.getArticles();
    },
    methods: {
        // 请求文章列表
        getArticles(){
            draftList({
                params: {
                    payload: {
                        page: 1,
                        limit: 10
                    }
                }
            }).then(res => {
                res && (this.draftDatas = res);
            })
        }
    }
}
</script>

<style lang="scss">
   @import "~scss/views/article-manage";
</style>