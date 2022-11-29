<template>
    <div class="table__calendarHolder">
        <p class="text-center font-weight-bold">{{ yearAndMonth }}</p>
        <table class="weekly__calendarHolder">
          <tr>
            <th><v-icon>{{ 'fa-chevron-left' }}</v-icon></th>
            <th>Su</th> 
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            <th><v-icon>{{ 'fa-chevron-right' }}</v-icon></th> 
          </tr>
          <tr>
            <td></td>
            <template v-for="day in 7">
                <td :class="{'today': today == dateRenderer(day)}">{{ dateRenderer(day) }}</td>
            </template>
          </tr>
          
        </table>
      </div>
</template>

<script>
export default {
    
    computed: {
        yearAndMonth() {
            return moment().format('MMMM YYYY');
        },
        today() {
            return moment().format('D');            
        },
        startOfWeek() {
            return parseInt(moment().startOf('week').format('D'));
        },
    },

    methods: {
        dateRenderer(day) {
            return moment().startOf('week').add('day', day).format('D');
        }
    },
    
}
</script>