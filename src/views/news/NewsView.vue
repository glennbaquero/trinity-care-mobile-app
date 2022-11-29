<template>
  <v-container pa-0 class="newsView__con">
    <v-layout row wrap mx-0 align-content-start>
      <v-img :lazy-src="article.full_image" :src="article.full_image" height="230" cover>
      </v-img>
      <v-container column py-8 px-6 class="article__con">
        <v-layout row wrap mx-auto>
          <v-flex xs12 mb-13>
            <h2>{{ article.title }}</h2>
          </v-flex>
          <v-flex xs12 mb-5 class="general__text" v-html="article.overview">
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>

    <v-container column pa-4 mt-5>
      <v-layout row wrap mx-auto>
        <v-flex xs12 mb-5>
          <template v-if="related_articles.length">
              <h3 class="type-1">Related Articles</h3>
          </template>
        </v-flex>
        <v-flex xs12 class="news__con newsView__relatedCon">
          <!-- COMPONENT_RELATED_NEWS -->
          <template v-for="item in related_articles">
            <v-card class="cstm-border-radius news__articleCon frm-elevation mb-2" @click="selectRelatedArticle(item)">
              <v-list class="pa-0">
                <v-list-item class="px-0">
                  <v-list-item-content class="news__listThumbnail py-0">
                    <v-img :lazy-src="item.full_image" :src="item.full_image">
                        <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                  </v-list-item-content>
                  <v-list-item-content class="px-5 py-4 align-self-start">
                    <h4 class="mb-4 type-2">{{ item.title }}</h4>
                    <h5 class="mb-0 type-gray font-weight-default" v-html="item.short_overview"></h5>
                    <small class="font-weight-default type-darkerGray">{{ item.upload_at }}</small>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </template>
          <!-- END_COMPONENT_RELATED_NEWS -->
        </v-flex>
      </v-layout>
    </v-container>
        <!-- On click button Write a Comment, Show this container -->
    <template v-if="loaded && article_count >= 3">
      <div class="frm-btn col-12 pa-0 text-center" v-if="current_count <= article_count">
        <v-btn
            @click="getRelatedArticle()"
            rounded 
            max-height="25"
            elevation="elevation-0" 
            class="button text-white cstm-button-radius text-small type-gradient-l-r v-btn--large">
           Show More
        </v-btn>
      </div>

      <div class="frm-btn col-12 pa-0 text-center" v-else>
          <v-btn
              @click="resetArticle()"
              rounded 
              max-height="25"
              elevation="elevation-0" 
              class="button text-white cstm-button-radius bg-red text-small">
             Hide Articles
          </v-btn>
      </div>
    </template>

    <v-container >
      <v-layout row wrap mx-auto>
        <v-flex xs6 mb-2>
          <h3 class="type-1">Comments</h3>
        </v-flex>
        <v-flex xs6 mb-2 text-right>
          <h3 class="type-gray">View all ({{ comments.length }})</h3>
        </v-flex>
        <!-- COMPONENT_COMMENT_LIST -->
        <v-flex mb-1 xs12 class="newsView__commentCon" v-for="(item, ik) in comments" :key="ik">
          <v-card 
            v-if="renderComment(item.id)"
            class="cstm-border-radius-5 frm-elevation"  
            @click="$PRXRouter().goTo('newsView')">
            <v-list  class="pa-0 newsView__commentReplyHead elevation-0">
              <v-list-item class="px-0">
                <v-list-item-icon class="py-0 ml-4 mr-0">
                  <v-img 
                      :lazy-src="item.image_path" 
                      :src="item.image_path" class="mx-auto news__commentThumbnail" width="40px" height="40px">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                        </v-row>
                    </template>
                  </v-img>
                </v-list-item-icon>
                <v-list-item-content class="px-5">
                  <h4 class="mt-2 mb-3 type-2">{{ item.full_name }}</h4>
                  <p class="mb-0 type-darkerGray"> {{ item.comment }}</p>
                  <small class="font-weight-default type-lighterGray mt-3">{{ item.date }}</small>
                </v-list-item-content>
                <v-list-item-icon class="pr-6 newsView__menu">
                  <v-menu offset-y v-if="!showReply">
                    <template v-slot:activator="{ on }">
                      <p v-on="on" class="mb-2 type-gray"><i class="fas fa-ellipsis-h"></i></p>
                    </template>
                    <v-list>
                      <v-list-item @click="replyShow(item.id)">
                        <v-list-item-title>Reply</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  
                  <template v-if="!showReply">
                      <small 
                          v-if="item.replies.length" 
                          class="type-2 bold" 
                          @click="viewReply(item.id)">View Reply ({{ item.replies.length }})
                      </small>
                  </template>

                </v-list-item-icon>
              </v-list-item>
            </v-list>
            <v-list class="pa-2 newsView__commentReply" v-if="viewAllReply == item.id && item.replies.length > 0">
              <v-list-item class="px-3" v-for="(reply, i) in item.replies" :key="i">
                <v-list-item-icon class="py-0 ml-4 mr-0">
                  <v-img  :lazy-src="reply.image_path" :src="reply.image_path" 
                          class="mx-auto news__commentThumbnail" 
                          width="40px" height="40px">
                      <v-progress-circular indeterminate color="#3B823E"></v-progress-circular>
                  </v-img>
                </v-list-item-icon>
                <v-list-item-content class="px-5">
                  <h4 class="mt-2 mb-3 type-2">{{ reply.full_name }}</h4>
                  <p class="mb-0 type-darkerGray"> {{ reply.reply }}</p>
                  <small class="font-weight-default type-lighterGray mt-3">{{ reply.date }}</small>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
        <!-- END_COMPONENT_COMMENT_LIST -->
        <!-- Onclick hide this whole V-flex -->
        <v-flex xs12 mt-2 v-if="!showReply">
          <v-btn class="text-white button cstm-button-radius text-small cstm-width type-gradient-l-r v-btn--large" @click="commentShow = true; showReply = false" v-show="!commentShow">Write a Comment</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- On click button Write a Comment, Show this container -->
    <div class="frm-btn col-12 pa-0 text-center" v-show="showReply">
        <v-btn
            @click="cancelReply()"
            rounded 
            max-height="25" 
            elevation="elevation-0" 
            class="text-white mb-3 bg-red">
           Cancel Reply
        </v-btn>
    </div>

    <v-container column pa-5 elevation-3 class="backgroundColor--white newsView__messageCon" v-show="showReply">

      <v-layout row wrap mx-auto>
        <v-flex xs10 pr-2>
          <v-text-field
            placeholder="Write a reply"
            color="#e9e9e9"
            outlined
            height="40"
            v-model="reply"
            :autofocus="showReply"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-layout row>
            <v-flex xs12 class="text-center">
              <v-btn
                  class="button cstm-button-radius text-small type-shdw-unset px-1 ml-3 " 
                  color="#ffffff00" dark @click="addReply()">
                <h2 class="type-1"><i class="fas fa-paper-plane"></i></h2>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container column pa-5 elevation-3 class="backgroundColor--white newsView__messageCon" v-show="commentShow">
      <v-layout row wrap mx-auto>
        <v-flex xs10 pr-2>
          <v-text-field
            placeholder="Write a Message"
            color="#e9e9e9"
            outlined
            height="40"
            v-model="comment"
            :autofocus="commentShow"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-layout row>
            <v-flex xs12 class="text-center">
              <v-btn
                  class="button cstm-button-radius text-small type-shdw-unset px-1 ml-3 " 
                  color="#ffffff00" dark @click="addComment">
                <h2 class="type-1"><i class="fas fa-paper-plane"></i></h2>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <SuccessDialog
      :show="successDialog"
      :message="message"
      image="icons/Check.svg"
      @close="successDialog = false"
    />
    <Loader
    ref="loader"
    ></Loader>
  </v-container>
</template>
<script>
import Loader from '@/components/Loader.vue';
import SuccessDialog from '@/components/SuccessDialog';

  export default {

    data() {
      return {
        comment: null,
        commentShow: false,
        comments: [],
        related_articles: [],
        showReply: false,
        reply: null,
        commentID: null,
        viewAllReply: null,
        successDialog: false,
        message: null,
        selectedId: null,
        article_count : 0,
        current_count : 0,
        loaded: false,
      }
    },

    watch: {

      selectedId(){
        this.resetArticle();
      },

    },

    computed: {
      article() {
        return this.$store.state.selectedArticle.item;
      }
    },

    components: { 
      SuccessDialog , 
      Loader 
    },

    mounted() {
      this.init();
    },

    methods: {
      init() {
        this.$store.commit('setTopNav/set', 'News');
        this.getArticleComments();
        this.getRelatedArticle();
      },

      // get related articles & comments
      getArticleComments(hasLoader = true) {
        if(hasLoader) {
          this.loader(true);
        }
       
        var data = {
          id: this.article.id
        };

        axios.post(this.routes['api.care.articles.comments.fetch'], data)
          .then(response => {
            this.comments = response.data.comments;
            this.loader(false);
        });
      },

      getRelatedArticle(hasLoader = true) {

        if(hasLoader) {
          this.loader(true);
        }
        this.loader(true);
        var data = {
          id: this.article.id,
          item : this.current_count,
        };

        axios.post(this.routes['api.care.articles.related.fetch'], data)
          .then(response => {
            this.related_articles.push(...response.data.related_articles);
            this.article_count = response.data.count;
            this.current_count += 3;
            this.loader(false);
        });
      },

      selectRelatedArticle(item){
        this.$store.commit('selectedArticle/set', item);
        this.selectedId = item.id;
        window.scrollTo(0,0);

      },

      addComment() {
        var data = {
          id: this.article.id,
          comment: this.comment
        };
        this.loader(true);
        axios.post(this.routes['api.care.articles.store'], data)
          .then(response => {
            this.loader(false);
            this.message = 'Your comment is successfully sent. Thank you!'
            this.successDialog = true;
            this.comment = null;
            this.commentShow = false;
            this.getArticleComments(false);
          })
      },

      replyShow(id) {
        this.showReply = true;
        this.commentID = id;
        this.commentShow = false;
        this.viewAllReply = id;
      },

      // add reply to the selected
      addReply() {

        var data = {
          reply: this.reply,
          id: this.commentID
        };

        this.loader(true);

        axios.post(this.routes['api.care.replies.store'], data)
          .then(response => {
            this.message = 'Your reply is successfully sent. Thank you!'
            this.showReply = false;
            this.successDialog = true;
            this.reply = null;
            this.getArticleComments(false);
            this.loader(false);
          });
      },

      // show all the replies of the selected comment
      viewReply(value) {
        if(value != this.viewAllReply) {
            this.viewAllReply = value;
        }else {
          this.viewAllReply = null;
        }
      },

      // show only the comment that currently replying
      renderComment(id) {
        if(this.showReply && this.viewAllReply != id) {
          return false;
        }
        return true;
      },

      // cancel reply
      cancelReply() {
        this.showReply = null;
        this.viewAllReply = null;
      },

      resetArticle() {
        this.showReply = false;
        this.viewAllReply = null;
        this.loaded = false;
        this.related_articles =  [];
        this.current_count = 0;  
        this.init();
      },

      loader(status = false) {
        if(status) {
          this.$refs['loader'].show();
        }else {
          this.$refs['loader'].hide();
          this.loaded = true;
        }     
      }
    }
  }
</script>