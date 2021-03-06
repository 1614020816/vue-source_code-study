<template>
    <div>
        <h3>自定义table组件</h3>
        <k-table :tableData="tableData">
            <k-table-column label="日期" prop="date"></k-table-column>
            <k-table-column label="名称" prop="name"></k-table-column>
            <k-table-column label="地址" prop="address"></k-table-column>
        </k-table>

        <h3>elementUI - table</h3>
        
        <el-table :data="tableData">
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import KTable from './k-table.vue'
import KTableColumn from './k-table-column'

export default {
    components: {
        KTable,
        KTableColumn
    },
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {

    }
}
</script>

