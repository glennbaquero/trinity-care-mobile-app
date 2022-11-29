import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        screen: {
            namespaced: true,
            state: {
                scrollable: true
            },

            mutations: {
                scrollable (state, value) {
                    state.scrollable = value
                }
            }
        },
        api: {
            namespaced: true,
            state: {
                addresses: [],
                articles: [],
                bankDetails: [],
                cartItems: [],
                cities: [],
                credits: 0,
                doctors: [],
                myhealth_item: [],
                notification_count: 0,
                ongoing_orders: 0,
                opentok_key: null,
                privacy: null,
                provinces: [],
                products: [],
                regions: [],
                reviewers: [],
                terms_and_condition : null,
                total_cart_items: 0,
                total_points: 0,
            },
            mutations: {
                set(state, value) {
                    state.routes = value ? value : {};
                },
                fetchData(state, data) {
                    state[data.key] = data.payload;
                },
                add(state, data) {
                    state[data.key] = [ data.payload, ...state[data.key] ]
                },

                addAddress(state, data) {
                    state.addresses.push(data);
                },

                update(state, data) {
                    const index = state[data.key].findIndex(d => d.id === data.id);
                    state[data.key][index] = { id: data.id, ...data.payload };
                },
                delete(state, data) {
                    const list = state[data.key].filter(item => item.id !== data.id);
                    state[data.key] = [ ...list ];
                },

                updateNotifCount(state, data) {
                    state.notification_count = data;
                },

                updateDoctors(state, data) {
                    state.doctors.push({...data});
                }
            },
            actions: {
                fetchData({ commit }, data) {
                    commit('fetchData', data);
                },
                add({ commit }, data) {
                    commit('add', data);
                },
                update({ commit }, data) {
                    commit('update', data);
                },
                delete({ commit }, data) {
                    commit('delete', data);
                }
            },
            getters: {
                regions: ({ regions }) => regions,
                provinces: ({ provinces }) => provinces,
                cities: ({ cities }) => cities,
                addresses: ({ addresses }) => addresses,
                articles: ({ articles }) => articles,
                doctors: ({ doctors }) => doctors,
                products: ({ products }) => products,
                invoices: ({ invoices }) => invoices,
                cartItems: ({ cartItems }) => cartItems,
                points: ({ points }) => points,
                total_points: ({ total_points }) => total_points,
                ongoing_orders: ({ ongoing_orders }) => ongoing_orders,
                reviewers: ({ reviewers }) => reviewers,
                pageItems: ({ myhealth_item }) => myhealth_item.pageItems
            }
        },

        user: {
            namespaced: true,
            state: {
                authEmail: null,
                details: {},
                auth: false,
                token: null,
                editAddressId: null,
                subTotal: 0,
                grandTotal: 0,
                shippingMethod: null,
                shippingFee: 0,
                paymentMethod: null,
                cartItems: [],
                selectedInvoice: null,
                shipping: {
                    shipping_name: null,
                    shipping_email: null,
                    shipping_mobile: null
                },
                voucher: null,
                discount: 0,
                uploadedDocument: {
                    file: null,
                    name: null,
                    preview: null,
                },
                info: {},
                allowBuy: false,
                productId: null,
                paymentMethods: [
                    { id: 1, name: 'Paypal', image_path: '/images/paypal.svg' },
                    { id: 2, name: 'Dragonpay', image_path: '/images/dragonpay.png' },
                    { id: 3, name: 'Visa / Mastercard', image_path: '/images/visa.svg' },
                    { id: 4, name: 'Bank Deposit', image_path: null },
                    { id: 5, name: 'Cash on Delivery', image_path: null },
                    { id: 6, name: 'GCash', image_path: null },
                    { id: 7, name: 'E-Wallet', image_path: null },
                ]
            },
            mutations: {
                set(state, value) {
                    state.details = value ? value : {}; 
                },

                setToken(state, value) {
                    state.token = value;
                },

                authenticate(state) {
                    state.auth = true;
                },

                clearAuth(state) {
                    state.auth = false;
                    state.token = null;
                },

                setData(state, data) {
                    state[data.name] = data.payload;
                }
            },
            actions: {
                setData({ commit }, data) {
                    commit('setData', data);
                }
            },
            getters: {
                authEmail: ({ authEmail }) => authEmail,
                editAddressId: ({ editAddressId }) => editAddressId,
                subTotal: ({ subTotal }) => subTotal,
                shippingMethod: ({ shippingMethod }) => shippingMethod,
                shippingFee: ({ shippingFee }) => shippingFee,
                voucher:({ voucher }) => voucher,
                discount:({ discount }) => discount,
                uploadedDocument:({ uploadedDocument }) => uploadedDocument,
                paymentMethod: ({ paymentMethod }) => paymentMethod,
                cartItems: ({ cartItems }) => cartItems,
                paymentMethods: ({ paymentMethods }) => paymentMethods,
                selectedInvoice: ({ selectedInvoice }) => selectedInvoice,
                productId: ({ productId }) => productId,
                shipping: ({ shipping }) => shipping,
                info: ({ info }) => info,
                allowBuy: ({ allowBuy }) => allowBuy,

            }
        },

        viewDoctors: {
            namespaced: true,
            state: {
                item: [],
                selected: null
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : {}; 
                },
                setSelected(state, value) {
                    state.selected = value;
                }
            },
        },

        cart: {
            namespaced: true,
            state: {
                item: [],
                selectedCartItem: null,
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : {}; 
                },
                setSelected(state, value) {
                    state.selectedCartItem = value;
                }
            },
        },

        selectedProduct: {
            namespaced: true,
            state: {
                item: [],
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : {}; 
                },
            },
        },

        selectedProductDoctor: {
            namespaced: true,
            state: {
                item: [],
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : {}; 
                },
            },
        },

        articles: {
            namespaced: true,
            state: {
                items: [],
            },

            mutations: {
                set(state, value) {
                    state.items = value;
                }
            }
        },

        selectedArticle: {
            namespaced: true,
            state: {
                item: [],
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : {}; 
                },
            },
        },

        pageName: {
            namespaced: true,
            state: {
                name: [],
            },
            mutations: {
                set(state, value) {
                    state.name = value ? value : null; 
                },
            },
        },


        setTopNav: {
            namespaced: true,
            state: {
                name: [],
            },
            mutations: {
                set(state, value) {
                    state.name = value ? value : null; 
                },
            },
        },

        points: {
            namespaced: true,
            state: {
                count: null,
            },
            mutations: {
                set(state, value) {
                    state.count = value ? value : null; 
                },
            },
        },

        reward: {
            namespaced: true,
            state: {
                item: null,
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : null; 
                },
            },
        },

        merchants: {
            namespaced: true,
            state: {
                items: null,
                filterRewards: null
            },
            mutations: {
                set(state, value) {
                    state.items = value ? value : null; 
                },

                setFilter(state, value) {
                    state.filterRewards = value ? value : null; 
                }
            },
        },

        notifications: {
            namespaced: true,
            state: {
                items: [],
                page: 1,
                count: 0,
            },
            mutations: {
                append(state, value) {
                    state.items.push(...value);
                },

                pageIncrement(state, value) {
                    state.page += value;
                },
                setCount(state, value) {
                    state.count = value;
                }
            }
        },

        news: {
            namespaced: true,
            state: {
                items: [],
                page: 1,
            },
            mutations: {
                append(state, value) {
                    state.items.push(...value);
                },

                pageIncrement(state, value) {
                    state.page += value;
                },
            }
        },

        selectedNotification: {
            namespaced: true,
            state: {
                item: null,
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : null; 
                },
            },
        },

        setSpecialization: {
            namespaced: true,
            state: {
                item: null,
            },
            mutations: {
                set(state, value) {
                    state.item = value ? value : null; 
                },
            },
        },

        notificationReceive: {
            namespaced: true,
            state: {
                show: false,
                message: null,
                title: null,
                bannerImage: null 
            },
            mutations: {
                set(state, value) {
                    state.show = value ? value : null; 
                },
                setMessage(state, value) {
                    state.message = value ? value : null; 
                },
                setTitle(state, value) {
                    state.title = value ? value : null; 
                },
                setBannerImage(state, value) {
                    state.bannerImage = value ? value : null; 
                },
            },
        },

        parent: {
            namespaced: true,
            state: {
                parent: null,
            },
            mutations: {
                set(state, value) {
                    state.parent = value;
                }
            },
        },

        onlineConsultation: {
            namespaced: true,
            state: {
                consultation: {},
                onCall: false,             
            },
            mutations: {
                setConsultation(state, value) {
                    state.consultation = value;
                },
                setOnCall(state, value) {
                    state.onCall = value;
                }                
            }
        },


        tempStorage: {
            namespaced: true,
            state: {
                products: {
                    page: 1,
                    items: [],
                },
                notifications: {
                    page: 1,
                    items: [],
                },
                news: {
                    page: 1,
                    items: [],
                },
            },

            mutations: {
                setProducts(state, value) {
                    state.products.page = value.page;
                    state.products.items.push(...value.items);
                },
                
                resetProducts(state, value) {
                    state.products = {
                        page: 1,
                        items: []
                    };
                },

                setNotifications(state, value) {
                    state.notifications.page = value.page;
                    state.notifications.items.push(...value.items);
                },

                resetNotifications(state, value) {
                    state.notifications = {
                        page: 1,
                        items: []
                    };
                },

                setNews(state, value) {
                    state.news.page = value.page;
                    state.news.items.push(...value.items);
                },

                resetNews(state, value) {
                    state.news = {
                        page: 1,
                        items: []
                    };
                },                

            },
        },

    },

    getters: {
//
    }
})
