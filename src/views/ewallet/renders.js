export default {
	methods: {

	    /*
	    |--------------------------------------------------------------------------
	    | @Renders
	    |--------------------------------------------------------------------------
	    */            

	    /**
	     * Render status
	     * 
	     * @param  object transaction
	     */
	    renderStatus(transaction) {
	        if(transaction.status == 1) {
	            return {
	                'class': 'color-primary2',
	                'label': 'PENDING'
	            };

	        } else if (transaction.status == 2) {
	            return {
	                'class': 'color-green',
	                'label': 'PAID'
	            };
	        } else {
	            return {
	                'class': 'color-darkerGray',
	                'label': 'CANCELLED'
	            };
	        }
	    },

	    /**
	     * Render tranasction  date
	     * 
	     * @param  object transaction
	     * @return date
	     */
	    renderTransactionDate(transaction) {
	    	if(transaction.created_at) {
		        let date = moment(transaction.created_at).format("Y-MM-D | hh:mm A")
		        return date;	    		
	    	}

	    },

	    /**
	     * Render credits
	     * 
	     * @param  obnject transaction
	     * @return int
	     */
	    renderCredits(transaction) {
	    	if(transaction.data) {
		        let transactionPackage = JSON.parse(transaction.data);
		        return transactionPackage.credits;	    		
	    	}

	    },		

	},
}