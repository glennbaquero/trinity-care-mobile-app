<template>
    <v-row class="px-5 py-9" no-gutters>
        <v-col cols="12" class="pa-0">
            <h1 class="font-weight-semibold">Hello, it's nice to have you!</h1>
            <p>Please login to your account</p>
            <form class="mt-12" @submit.prevent="login">
                <div class="frm-inpt form__input--text mb-2">
                    <v-text-field
                        placeholder="Enter Email Address Here"
                        v-model="email"
                        label="Email"
                        type="email"
                        color="#3B823E"
                        @keyup.enter="login"
                        :error-messages="errors.email"
                    ></v-text-field>
                </div>
                <div class="frm-inpt form__input--text">
                    <v-text-field
                        placeholder="Enter Password"
                        v-model="password"
                        label="Password"
                        type="password"
                        color="#3B823E"
                        @keyup.enter="login"
                        :error-messages="errors.password"
                    ></v-text-field>
                </div>
                <div class="text-right">
                    <a href="#" @click="$PRXRouter().goTo('forgetPassword')" class="text-darkgreen font-weight-semibold font-size-small">Forgot Password?</a>
                </div>
                <div class="my-4 frm-btn">
                    <v-btn 
                    block 
                    rounded
                    large
                    :dark="!loading"
                    :disabled="loading"
                    elevation="elevation-0"
                    min-height="60"
                    @click="login"
                    :class="`${loading ? 'type-3' : 'btn--green'}`"><span v-if="!loading">Log in</span>
                        <Spinner v-else stroke-color="#afafaf" />
                    </v-btn>
                </div>
                <div class="text-center mb-6">
                    <h4 class="font-weight-regular">Don’t have an account yet? <a href="#" @click="$PRXRouter().goTo('signup')" class="text-darkgreen font-weight-semibold">Sign Up</a></h4>
                </div>
                <div class="text-center">
                    <h4 class="font-weight-bold type-gray">or</h4>
                </div>
                <div class="mt-4 frm-btn">
                    <v-btn 
                    block 
                    rounded
                    large
                    min-height="60"
                    elevation="elevation-0"
                    @click="socialLogin('facebook')"
                    class="btn--fb">
                        <v-img :src="$PRXConfig().staticUrl('icons/fb.png')" position="left" max-width="12" width="12" height="16" contain></v-img>Facebook Login
                    </v-btn>
                </div>
                <div class="mt-5 frm-btn">
                    <v-btn 
                    block 
                    rounded
                    large
                    min-height="60"
                    elevation="elevation-0"
                    @click="socialLogin('google')"
                    class="btn--google">
                        <v-img :src="$PRXConfig().staticUrl('icons/google-plus.png')" position="left" max-width="25" width="25" height="16" contain></v-img>
                        Google Login
                    </v-btn>
                </div>
                <template v-if="isIos">
                  <div class="mt-5 frm-btn">
                    <v-btn 
                    block 
                    rounded
                    large
                    min-height="60"
                    elevation="elevation-0"
                    color="black"
                    style="color: white" 
                    @click="socialLogin('apple')">
                      <v-img :src="$PRXConfig().staticUrl('icons/apple.png')" position="left" max-width="38" width="25" height="20" contain></v-img> Sign in with Apple
                    </v-btn>
                  </div>
                </template>

                <!-- <div class="text-center mt-5">
                    <h4 class="font-weight-regular">Click <a href="#" @click="$PRXRouter().goTo('signup')" class="text-darkgreen font-weight-semibold">here</a> to Sign Up as Secretary</h4>
                </div> -->
            </form>
        </v-col>
        <v-snackbar v-model="snackbar">
            {{ text }}
            <v-btn color="#fabf24" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        <ConfirmationDialog
        :show="verificationDialog"
        :message="verificationMessage"
        image="icons/prompt.svg"
        :default-slot="false">
        <v-card-actions class="pa-0 justify-center flex-column">
          <v-btn
            class="button cstm-button-radius v-btn--small type-shdw-gray mt-3"
            color="#A8A8A8"
            dark
            width="200px"
            @click="verificationDialog = false">
            Ok
          </v-btn>
          
        </v-card-actions>
        </ConfirmationDialog>

        <ConfirmationDialog
        :show="loadingDialog"
        message="Verifying..."
        image="icons/prompt.svg"
        :default-slot="false">
            <v-flex d-flex align-center justify-center>
                <Spinner stroke-color="#afafaf" />
            </v-flex>
        </ConfirmationDialog>

        <SuccessDialog
          :show="approvalDialog"
          :message="approvalMessage"
          title="Approval in process"
          image="icons/prompt.svg"
          @close="approvalDialog = false"
        />

        <ErrorDialog
          :show="errorDialog"
          :message="errorMessage"
          @close="errorDialog = false"
        />
    </v-row>

</template>

<script>
  import LogoutMixin from '@/assets/js/mixins/logout.js';
  import QrMixin from '@/assets/js/mixins/qr.js';
  import ConfirmationDialog from '@/components/ConfirmationDialog';
  import SuccessDialog from '@/components/SuccessDialog';
  import ErrorDialog from '@/components/ErrorDialog';
  import Spinner from '@/components/Spinner';
  import { bus } from '@/assets/js/EventBus.js';

  export default{
    mixins: [ QrMixin, LogoutMixin ],

    data() {
      return {
        verificationDialog: false,
        verificationMessage: null,
        approvalDialog: false,
        approvalMessage: null,
        errorDialog: false,
        errorMessage: null,
        loadingDialog: false,
        email: null,
        password: null,
        browser: null,
        snackbar: false,
        text: null,
        loading: false,
        errors: {}
      }
    },

    components: { ConfirmationDialog, SuccessDialog, ErrorDialog, Spinner },

    mounted() {
        if (window.localStorage.getItem('authToken') && this.$PRXRouter().areOnRoute(['login'])) {
            this.$PRXRouter().goTo('home');
        }
    },

    methods: {

      resendVerification(){

        const data = {
          email: this.email
        }

    
         axios.post(this.routes['api.care.verify.email'], data) 
          .then(response => {
            console.log(response.data);
          })

      },

      enterQr() {
        this.$store.commit('user/setData', { name: 'authEmail', payload: this.email });
        this.$PRXRouter().goTo('qrVerification');
      },

      uploadPrescription() {
        this.$store.commit('user/setData', { name: 'authEmail', payload: this.email });
        this.$PRXRouter().goTo('prescriptionVerification');
      },

      scan() {
        this.openQRReader(qr => {
          const body = {
            qr_id: qr,
            email: this.email
          };

          this.loadingDialog = true;

          axios.post('/api/care/verify/qr', body)
            .then(response => {
              this.loadingDialog = false;
              this.verificationDialog = false;
              this.setToken(response.data.token, response.data.user);
            })
            .catch(error => {
              this.loadingDialog = false;
              this.verificationDialog = false;
              this.errorMessage = error.response.data.errors.qr_id[0];
              this.errorDialog = true;
            });
        });
      },

      login() {
        const data = {
          email: this.email,
          password: this.password
        };

        this.loading = true;

        axios.post(this.routes['api.care.login'], data) 
          .then(response => {
            const data = response.data;
            this.setToken(data.token, data.user, data.settings);
            bus.$emit('userLogin');
          })
          .catch(error => {
            console.log(error);
            const errors = error.response.data.errors;

            this.errors = { ...errors };
            this.loading = false;

            if (errors.account) {
              this.verificationMessage = errors.account[0];
              this.verificationDialog = true;
            }

            if (errors.approval) {
              this.approvalMessage = errors.approval[0];
              this.approvalDialog = true;
            }

            if (errors.rejected) {
              this.errorMessage = errors.rejected[0];
              this.errorDialog = true;
            }
          })
      },

      setToken(token, user, settings) {
        if(this.isCordova) {
          this.setupPushNotif();
        }
        window.axios.defaults.headers.common['Authorization'] = token;
        window.localStorage.setItem('authToken', token);
        this.$store.commit('user/setToken', token);
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('settings', JSON.stringify(settings));
        if (this.$PRXRouter().areOnRoute(['login'])) {
            this.$PRXRouter().goTo('home');
            this.$store.commit('pageName/set', 'Home');
        }
        this.loading = false;
      },

      socialLogin(provider) {
        switch (provider) {
          case 'facebook' : 
            this.facebookLogin();
            break;
          case 'google' :
            this.googleLogin();
            break;
          case 'apple' :
            this.appleLogin();            
        }
      },

      facebookLogin() {
        var $this = this;
        var fbLoginSuccess = function (response) {
          console.log("UserInfo: ", response);
          if(response.status === 'connected') {
              facebookConnectPlugin.api(response.authResponse.userID+"/?fields=id,email,first_name,last_name",["public_profile"], 
                function (response) {
                  var data = {
                    first_name: response.first_name,
                    last_name: response.last_name,
                    email: response.email,
                    facebook_id: response.id
                  }
                  axios.post($this.routes['api.care.fb.register'], data)
                    .then(response => {
                      var data = response.data;
                      $this.setToken(data.token, data.user, data.settings);
                      bus.$emit('userLogin');
                    })
                },
                function (error) {
                  console.log('Error : ' + error);
                }
                )
          }
        }

        facebookConnectPlugin.login(["public_profile", 'email'], fbLoginSuccess,
          function loginError (error) {
            console.error(error)
          }
        );
      },

      googleLogin() {
        
        window.plugins.googleplus.login({},
          (obj) => {
            this.loading = true;
            axios.post(this.routes['web.social.google.login'], obj)
            .then(response => {
              let data = response.data;

              window.localStorage.setItem('socialLogin', data.user.token);
              this.email = data.user.email;
              if(data.user.email_verified_at) {
                this.setToken(data.user.token, data.user, data.settings);
                bus.$emit('userLogin');              
              } else {
                this.verificationMessage = 'Please verified your account to login';
                this.verificationDialog = true;
              }
            }).catch(error => {
              console.log(error);
            }).then(() => {
              this.loading = false;
            });
          },
          (msg) => {
            this.snackbar = true;
            this.text = 'Sorry, you are unable to login. Error Code: ' + msg;
            console.log('Sorry, you are unable to login. Error Code: ' + msg)
            .then(() => {
              try {
                
              } catch (e) {
                
              }
            });
          }
        );
      },

       /**
       * Login using apple id
       * 
       */
      appleLogin() {

        let $this = this;
        console.log('logging in...')
        window.cordova.plugins.SignInWithApple.signin(
          { requestedScopes: [0, 1] },
            function(success) {

              let data = {
                email: success.email,
                social_id: success.user,
                first_name: success.fullName.givenName,
                last_name: success.fullName.familyName
              };

              axios.post($this.routes['api.care.apple.login'], data)
                .then((response) => {
                  let data = response.data;
                  if(!data.user.first_name) {
                    $this.errorMessage = "We can't retrieve your Apple account details. Please check your account configuration and try again.";
                    $this.errorDialog = true;
                  } else {
                    window.localStorage.setItem('socialLogin', data.user.token);                    
                    $this.setToken(data.user.token, data.user, data.settings);
                    bus.$emit('userLogin');                    
                  }
                }).catch((err) => {
                  console.log(err);
                });
            },
            function(err) { 
              if(!err.code) {
                $this.errorMessage = "You device doesn't support Apple Account login.";
                $this.errorDialog = true;        
              }
              console.log(err);
            }
        )

      },
    }
  }
</script>
