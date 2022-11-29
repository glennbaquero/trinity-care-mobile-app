export default {
	methods: {

        /**
         * Confirm chat request
         * 
         * @param  object doctor
         */
        confirmChatRequest(doctor) {

        	this.$refs['loader'].show();

            let data = {
                doctor_id: doctor.id
            };

            axios.post(this.routes['api.care.consultations.check-pending'], data)
                .then((response) => {
                    this.$refs['loader'].hide();
                    this.$store.commit('viewDoctors/setSelected', doctor);
                    if(response.data.canbook == 'unavailable') {
                        this.$alert.show(response.data.title, response.data.message);
                    } else {
                        if(!response.data.exists) {
                            this.$refs['confirmation'].show();
                        } else {
                            this.openChat({
                                consultation: response.data.consultation,
                            });
                        }                            
                    }
                }).catch((err) => {
                    this.$refs['loader'].hide();
                });
        },

        openChat(consultation) {
            this.$store.commit('onlineConsultation/setConsultation', consultation.consultation);                
            this.$PRXRouter().goTo('chats');
        },		

        /**
        * View Calendar
        * 
        * @param  int doctorID
        */
        viewCalendar(doctor) {
            this.$router.push({name: 'book-appointment', params: { doctor }});
        },

        /**
         * Show doctor profile
         * 
         * @param  object doctor
         */
        showDoctor(doctor) {
            this.$store.commit('viewDoctors/setSelected', doctor);
            this.$PRXRouter().goTo('doctor-profile');
        },

        /*
        |--------------------------------------------------------------------------
        | @Checkers
        |--------------------------------------------------------------------------
        */
        
        /**
         * Check if user can book
         * 
         * @param  int fee
         */
        canBook(fee) {
            if(parseInt(this.$store.state.api.credits) >= parseInt(fee)) {
                return true;
            }
        }        

	},
}