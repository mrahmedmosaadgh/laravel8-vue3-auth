import api from '@/utilities/api'
import { 
    addNewFilter, 
    makeFormDataFromObject, 
    isEmpty, 
    addUpdateItem 
} from '@/utilities/helper'

const moduleApiUrl = '/api/employees'

const state = {
    employees: [],
    employee: [],
    allDataLoaded: false,
}

const getters = {
    employees: state => state.employees,
    employee: state => state.employee,
    employeeByUuid: state => uuid => state.employees.find(i => i.uuid == uuid),
    isEmployeeDataLoaded: state => state.allDataLoaded
}


const actions = {
    async getEmployees({ commit }) {
        let reqData = {
            method: "GET"
        }
        const response = await api(`${moduleApiUrl}`, reqData)
        const { status, data } = response
        switch (status) {
            case 200:
                commit("getEmployees", data)
                break
            default:
                console.error(`getEmployees()::API Failed with status code ${status}`, data)
                break
        }
        return response
    },
    async getEmployee({ commit }, uuid) {
        let reqData = {
            method: "GET"
        }
        const response = await api(`${moduleApiUrl}/${uuid}`, reqData)
        const { status, data } = response
        switch (status) {
            case 200:
                commit("getEmployee", data)
                break
            default:
                console.error(`getEmployee()::API Failed with status code ${status}`, data)
                break
        }
        return response
    },
    async createEmployee({ commit }, params) {
        let createData = makeFormDataFromObject(params)
        let reqData = {
            method: "POST",
            data: createData
        }
        const response = await api(`${moduleApiUrl}`, reqData)
        const { status, data } = response
        switch (status) {
            case 200:
                commit("createEmployee", data)
                break
            default:
                console.error(`createEmployees()::API Failed with status code ${status}`, data)
                break
        }
        return response
    },
    async updateEmployee({ commit }, params) {
        let editData = makeFormDataFromObject(params)
        editData.append("_method", "PATCH")
        let reqData = {
            method: "POST",
            data: editData
        }
        const response = await api(`${moduleApiUrl}/${params.uuid}`, reqData)
        const { status, data } = response

        switch (status) {
            case 200:
                commit("updateEmployee", data)
                break
            default:
                console.error(`updateEmployee()::API Failed with status code ${status}`, data)
                break
        }
        return response
    },
    async deleteEmployee({ commit }, uuid) {
        const reqData = {
            method: "DELETE"
        }
        const response = await api(`${moduleApiUrl}/${uuid}`, reqData)
        const { status, data } = response
        switch (status) {
            case 200:
                commit("deleteEmployee", uuid)
                break
            default:
                console.error(`deleteEmployee()::API Failed with status code ${status}`, data)
                break
        }
        return response
    }
}

const mutations = {
    getEmployees(state, data) {
        state.employees = addNewFilter(state.employees, data.employees)
        state.allDataLoaded = true
    },
    getEmployee(state, data) {
        state.employee = data.employee
        state.employees = addUpdateItem(state.employees, data.employee)
    },
    createEmployee(state, data) {
        state.employee = data.employee
        state.employees = addUpdateItem(state.employees, data.employee)
    },
    updateEmployee(state, data) {
        if(!isEmpty(state.employee)){
            if(state.employee.uuid == data.employee.uuid){
                state.employee = data.employee
            }
        }
        state.employees = addUpdateItem(state.employees, data.employee)
    },
    deleteEmployee(state, uuid) {
        if(!isEmpty(state.employee)){
            if(state.employee.uuid == uuid){
                state.employee = []
            }
        }
        state.employees = state.employees.filter(i => i.uuid != uuid)
    },
}


export const employee = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}