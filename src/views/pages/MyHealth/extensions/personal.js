import SuccessDialog from '@/components/SuccessDialog';
import Loader from '@/components/Loader';

export default {
    components: {
        SuccessDialog,
        Loader
    },

    data () {
        return {
            isFormValid: false,
            message: null,
            successDialog: false,
            post: {
                personal_information: {
                    condition: null,
                    weight: null,
                    weight_units: null,
                    height_feet: null,
                    height_inches: null,
                },
            },

            rules: {
                required: value => !!value || 'Required field.',
                number: value => /^[0-9.,]+$/.test(value) || 'Must be in number format'
            },
        }
    },

    methods: {
        submitPersonalInformation() {
            this.$refs['loader'].show();

            axios.post(this.routes['api.care.personal-informations.store'], this.post.personal_information)
            .then((response) => {
                this.$refs['loader'].hide();
                this.$emit('close');
                this.$emit('re-init');
                this.setSuccessDialog();
                this.message = response.data.message;

                if(response.status === 200) {
                    this.message = response.data.message;
                }
            }).catch((err) => {
                this.$refs['loader'].hide();
            });
        },

        setSuccessDialog() {
            this.successDialog = this.successDialog ? false: true;
        },
    },

}