const initialState = {
    id_user: 0,
    nis: '',
    fullname: '',
    email: '',
    nomor_hp: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    gender: '',
    password: '',
    address: '',
    class: '',
    role: 'student',
    auth: false,
    loading: true
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ACTION':
            return state = {
                ...state,
                ...action.payload
            }
        case 'LOGOUT_ACTION':
            return state = initialState;
        case 'LOGIN_AUTH':
            return state = {
                ...state,
                auth: true
            };
        case 'LOGIN_AUTH_FALSE':
            return state = {
                ...state,
                auth: false
            };
        case "IS_LOADING":
            return {
                ...state, loading: true
            };
        case "DONE_LOADING":
            return {
                ...state, loading: false
            };
        default:
            return state = initialState;
    }
}