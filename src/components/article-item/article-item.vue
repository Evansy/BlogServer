<template>
    <article class="components-article-item">
        <div class="article-item-banner">
            <h2 class="article-item-title">第一篇测试文章</h2>
        </div>
        <div class="article-item-introduce">
            <p class="article-item-meta">
                <a class="article-item-category font-blue" href="javascript: void(0);">javascript</a> / 
                <span class="article-item-time">2017-02-06</span>
            </p>
            <div class="article-item-content">
                <p class="article-item-text">进来看到网上有个微信的面试题，获取页面上一个元素的背景颜色 粗看不是很难，其实要考虑的方面还是蛮多的，比如当前元素本身没有颜色，取的是某个父元素的颜色 依据网上的描述，我也重新写了个demo. demo</p>
                <router-link :to="{name: 'Detail', params: {id: 10}}" class="unl font-blue article-read-more">阅读全文</router-link>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'article-item',
    props: {
        articleInfo: {
            type: Object
        }
    }
}
</script>


<style lang="scss">
    @import './style';
</style>
