<template>
    <table>
        <tr>
            <th
                v-for="(column, index) in columns"
                :key="`th-${column.label}${column.prop}${index}`"
            >
                {{ column.label }}
            </th>
        </tr>
        <tr
            v-for="(cols, $index) in rows"
            :key="`tr-${$index}`"
        >
            <td
                v-for="col in cols"
                :key="`td-${col.label}${col.prop}${$index}${col.value}`"
            >
                {{ col.value }}
            </td>
        </tr>
        <slot/>
    </table>
</template>

<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            columns: []
        }
    },
    computed: {
        rows() {
            return this.tableData.map(item =>
                this.columns.map(column => ({...column, value: item[column.prop]})),
            );
        }
    },
    methods: {},
    mounted() {
        console.log(this.columns)
    }
};
</script>


