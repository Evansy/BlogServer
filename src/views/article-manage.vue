<template>
   <div class="article-manage">
       <Table border :columns="articleColumns" :data="articleDatas"></Table>
   </div>
</template>

<script>
import { articleList, deleteArticle } from 'apis';

export default {
    name: "article-manage",
    data () {
        return {
            articleColumns: [
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
                },
                {
                    title: '操作',
                    key: 'options',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.showDetail(params.index)
                                    }
                                }
                            }, 'View'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.deleteArticle(params.row, params.index)
                                    }
                                }
                            }, 'Delete')
                        ]);
                    }
                }
            ],
            articleDatas: []
        }
    },
    created(){
        this.getArticles();
    },
    methods: {
        // 请求文章列表
        getArticles(){
            articleList({
                params: {
                    payload: {
                        page: 1,
                        value: '全部',
                        limit: 10
                    }
                }
            }).then(res => {
                res && (this.articleDatas = res);
            })
        },

        // 显示文章详情
        showDetail(aid){
            this.$router.push({
                path: '/detail/' + aid,
            });
        },

        // 删除文章操作
        deleteArticle(param, index) {
            param && this.$Modal.confirm({
                title: '删除文章？',
                content: `真的要删除  "${param.title}？"`,
                loading: true,
                onOk: () => {
                    this.$Modal.remove();
                    this.onDeleteArticle(param.aid, index);
                }
            })
        },

        // 请求接口删除文章
        onDeleteArticle(aid, index){
            aid && deleteArticle({
                aid: aid
            }).then(res => {
                // console.log(res);
                this.articleDatas.splice(index, 1);
                this.$Message.info('删除文章成功！');
            })
        }
    }
}
</script>

<style lang="scss">
   @import "~scss/views/article-manage";
</style>
