import { createSlice } from '@reduxjs/toolkit'
const initialAuthState = {  // CREACION OBJETO
    isAutenticated: false,
    userName: '',
    userRol: ''
}
const authSlice = createSlice({  // DENTRO NECESITAMOS NOMBRE PARA SLICE
    name: 'authentication',
    initialState: initialAuthState, // ESTADO INICIAL
    reducers: {  // ES COMO LOS ESTADOS EL REDUCERS
        login: (state, action) => {  // CUANDO ESTA AUTENTICADO
            const userData = action.payload // VARIABLE QUE CUANDO LLAME AL LOGIN, COGE LOS DATOS QUE TE PASO Y LO CARGAS EN LA VAR USERDATA Y LUEGO ACTUALIZO ESTADO DE USERLOG Y USERNAME
            state.isAutenticated = true
            state.userName = userData.name  // NOMBRE QUE ESTA EN LA "BD" QUE YA DEFINIMOS ARRIBA
            state.userRol = userData.rol
        },
        logout: (state) => {
            state.isAutenticated = false
            state.userName = ''
            state.userRol = ''
        }
    }
})
export const loginActions = authSlice.actions
export default authSlice.reducer

// GUARDAMOS LAS VARIABLES AQUI