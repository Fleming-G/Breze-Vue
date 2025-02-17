import axios from "@/utils/http/axios";

export default {
    getTableData() {
        return axios({
            url: "/tool/code/tables",
            method: 'get'
        })
    },
    generteCode(params){
        return axios({
            url: "/tool/code/generate",
            method: 'post',
            data: params
        })
    }
}