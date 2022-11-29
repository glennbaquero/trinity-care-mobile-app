<template>
    <v-container fill-height pa-0 class="backgroundColor--white">
        <v-layout row wrap mx-0 align-content-start>
            <v-container column align-center justify-space-between pa-5 class="help__con">
                <!-- SEARCH_COMPONENT -->
                <form>
                    <v-flex xs12 class="frm-elevation search__con cstm-button-radius mb-4">
                        <v-layout row wrap mx-auto>
                            <v-flex xs10 class="search__form">
                                <v-text-field
                                v-model="search"
                                label="Type your keyword here"
                                single-line
                                solo
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs2 class="search__icon">
                                <i class="fas fa-search"></i>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </form>
                <!-- END_SEARCH_COMPONENT -->
                <v-layout row wrap mx-auto>
                    <v-flex xs12 mb-12>
                        <!-- COMPONENT_HELP_ARTICLE -->
                        <template v-for="(item, key) in filteredFaqs">
                            <h3 class="type-1 mb-3 mt-2" v-if="key != 'undefined'">{{ item[0].category.name }}</h3>
                            <template v-if="key != 'undefined'" v-for="faq in item" >
                                <v-expansion-panels class="help__accordion mb-4 cstm-border-radius frm-elevation">
                                    <v-expansion-panel class="cstm-border-radius">
                                        <v-expansion-panel-header><h5 class="type-2 bold">{{ faq.question }}</h5></v-expansion-panel-header>
                                        <v-expansion-panel-content class="text-left">
                                            <h5 class="type-darkerGray font-weight-default" v-html="faq.answer"></h5>
                                        </v-expansion-panel-content>
                                  </v-expansion-panel>
                              </v-expansion-panels>
                          </template>
                        </template>
                      <!-- END_COMPONENT_HELP_ARTICLE -->
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>
        <Loader ref="loader"></Loader>
    </v-container>
</template>

<script>
import Loader from '@/components/Loader.vue';

export default {

    components : {
        Loader,
    },
    computed: {
        filteredFaqs(){

            let faqs = this.items;

            var groups = _.groupBy(faqs, (faq) => {
                return faq.faq_category_id;
            })

            if(this.search){
                groups = [];
                groups = _.groupBy(faqs, (faq) => {
                    if(faq.question.toLowerCase().includes(this.search.toLowerCase())) {
                        return faq.faq_category_id;
                    }
                })
            }

            return groups;
        },

        isEmptyFaqs() {
            return _.isEmpty(this.filteredFaqs)
        },
    },

    data() {
        return {
            items: [],
            search: null,
        }
    },

    mounted(){
        this.init();
    },

    methods: {

        init(){
            this.fetchFaqs();
        },

        fetchFaqs(){
            this.$refs.loader.show();
            axios.get(this.routes['api.care.faqs.fetch'])
            .then(response =>{
                this.items = response.data.faqs;
                 this.$refs.loader.hide();
            });
        }

    },
}
</script>
