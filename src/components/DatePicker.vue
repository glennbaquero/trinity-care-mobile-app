<template>
    <div>
        <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
        >         
            <template v-slot:activator="{ on }">
                <h5 
                v-on="on"
                class="font-weight-default">{{ renderDate }}</h5>
            </template>
            <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="cancel()">Cancel</v-btn>
                <v-btn text color="primary" @click="confirm()">OK</v-btn>
            </v-date-picker>
        </v-dialog>
    </div>    
</template>
<script>
export default {

    props: {
        defaultDate: {
            type: String,
            default: null
        },
    },

    computed: {
        renderDate() {
            let date = this.defaultDate ? this.defaultDate: this.date;
            date = moment(date).format("MMMM D, YYYY");
            return date;
        },        
    },

    data() {
        return {
            modal: false,
            date: moment().format("YYYY-MM-DD"),
        }
    },

    methods: {
        confirm() {
            this.$refs.dialog.save(this.date);
            this.$emit('date-selected', this.date);
        },

        cancel() {
            this.modal = false;
            this.$emit('date-selected', null);            
        }
    },
}
</script>