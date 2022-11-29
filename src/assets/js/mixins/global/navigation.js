import DoctorProfile from '@/views/onlineconsultation/DoctorProfile.vue';
import Ewallet from '@/views/ewallet/Ewallet.vue';

export default {
	components: {
		DoctorProfile,
		Ewallet,
	}, 

	methods: {
		/**
       * Show Doctor Profile modal
       */
		doctorProfileShow(doctor) {
			this.$store.commit('viewDoctors/setSelected', doctor);
			this.$refs['profile'].show();
		},

		/**
       * Show E-wallet modal
       */
		ewalletShow() {
			this.$refs['ewallet'].show();
		},
	}
}